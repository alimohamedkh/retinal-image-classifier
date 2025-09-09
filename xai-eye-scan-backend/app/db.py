import os
from supabase import create_client, Client
from dotenv import load_dotenv
import io, uuid
from PIL import Image

# load_dotenv() is still useful for local development outside of Docker.
# When running in Docker, these variables will be provided directly.
load_dotenv() 

# Global variable to hold the client instance.
# It starts as None and will be populated on the first request.
_supabase_client: Client = None

def get_db_client():
    """
    Initializes and returns a Supabase client.
    Uses a global variable to ensure the client is created only once.
    """
    global _supabase_client
    
    # If the client hasn't been created yet, create it.
    if _supabase_client is None:
        url: str = os.environ.get("SUPABASE_URL")
        key: str = os.environ.get("SUPABASE_KEY")

        if not url or not key:
            raise ValueError("Error: Supabase credentials not found in environment variables.")
        
        print("Initializing Supabase client...") # This will now only print once per worker, on its first DB task.
        _supabase_client = create_client(url, key)
        print("Supabase client initialized.")

    return _supabase_client

#-------------------------#--------------------#----------------------#
def user_authenticated(jwt_token: str) -> bool:

    # Handle the case of a missing token immediately
    if not jwt_token:
        return False

    try:
        # Get the Supabase client
        client = get_db_client()

        # Ask Supabase to validate the token.
        user_response = client.auth.get_user(jwt_token)
        print(user_response)

        # If the call succeeds and we get a user object back, they are authenticated.
        if user_response.user:
            return True
        else:
            return False
        
    except Exception as e:
        # Catch any other unexpected errors (e.g., network issues)
        print(f"An unexpected error occurred during authentication: {str(e)}")
        return False
    
def upload_image(img, img_type) :

    # superimposed_img: np.ndarray (H, W, 3) RGB, uint8

    client = get_db_client()

    # 1) Encode to PNG in-memory
    buf = io.BytesIO()
    Image.fromarray(img).save(buf, format="PNG")
    buf.seek(0)
    png_bytes = buf.getvalue()

    # 2) Choose a path/name in the bucket
    BUCKET_NAME = "Images"
    if img_type == "heatmap":
        filename = f"heatmaps/{uuid.uuid4().hex}.png"
    else:
        filename = f"scanimage/{uuid.uuid4().hex}.png"

    # 3) Upload
    client.storage.from_(BUCKET_NAME).upload(
        filename,
        png_bytes,
        {"content-type": "image/png", "upsert": False}
    )

    url = client.storage.from_(BUCKET_NAME).get_public_url(filename)
    
    return url

def update_history(jwt_token : str, Dpatient_id : str, scanimage_url : str, predicted_class : str, heatmap_url : str):

    client = get_db_client()

    # Update the user's history in the database
    if(Dpatient_id is None) :
        patient_id = client.auth.get_user(jwt_token).user.id
        response = client.table("History").insert({
            "Scan_image": scanimage_url,
            "Class": predicted_class,
            "Heatmap_image": heatmap_url,
            "DPatient_id": None,
            "Patient_id": patient_id,
            
        }).execute()
    
    else :
        response = client.table("History").insert({
            "Scan_image": scanimage_url,
            "Class": predicted_class,
            "Heatmap_image": heatmap_url,
            "DPatient_id": Dpatient_id,
            "Patient_id": None,
            
        }).execute()

    if response.data:
        print("Successfully inserted history record.")
        return True
    else:
        print("Insert operation did not return data. Might be an issue.")
        return False