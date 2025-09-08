from flask import Flask
from app.db import user_authenticated, upload_image
from models.scorecam import generate_heatmap 
from flask import request, jsonify
import os
import numpy as np
import io
import tensorflow as tf
from keras.applications.resnet50 import preprocess_input
from keras.preprocessing.image import img_to_array
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

model = None

def load_keras_model():
    """
    Loads the pre-trained Keras model from disk.
    This function is called only once, when the application starts.
    """
    # Use the 'global' keyword to modify the global 'model' variable.
    global model
    
    model_path = os.path.join('models', 'best_acc_model_stage_2-epoch-26-val_accuracy-0.92.keras')
    
    try:
        # Load the model.
        model = tf.keras.models.load_model(model_path)
        # You can print the model summary to confirm it's loaded correctly.
        print("✅ Keras Model Loaded Successfully!")
    except Exception as e:
        print(f"❌ Error loading Keras model: {e}")

load_keras_model()

@app.route('/')
def index():
    return "Welcome to our retinal-image-classifier!"

@app.route('/predict', methods=['POST'])
def predict():
    
    # Get the Authorization header from the incoming request
    auth_header = request.headers.get('Authorization')
    
    jwt_token = None
    # Extract the token from the "Bearer <token>" format
    if auth_header:
        parts = auth_header.split()
        if len(parts) == 2 and parts[0].lower() == 'bearer':
            jwt_token = parts[1]

    # Call your function with the token and check the result in an 'if' statement
    if not user_authenticated(jwt_token):
        # If the function returns False, block the request immediately
        return jsonify({"error": "Unauthorized: Invalid or missing token"}), 401

    try:
        # Extract the Image
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        image_file = request.files['file']
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes))

        upload_image(np.array(image))

        # RESIZE THE IMAGE'S DIMENSIONS
        target_size = (224, 224)
        image = image.resize(target_size)

        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        
        # Predict
        class_names = ['cataract','diabetic_retinopathy','glaucoma','normal']
        preds = model.predict(img_array)
        class_index = np.argmax(preds[0])
        pred_class_name = class_names[class_index]

        heatmap_url = upload_image(generate_heatmap(model, img_array, 'conv5_block3_out', class_index, pred_class_name, image), "heatmap")

        print("predicted_class :" , pred_class_name)

        return jsonify({
            "predicted_class": pred_class_name,
            "heatmap_url": heatmap_url,
        })

    except Exception as e:
        print(f"An error occurred during prediction: {e}")
        return jsonify({"error": "Failed to process the request."}), 500
    
    

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0')
    

