FROM python:3.10-slim

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy your application code and models into the container
COPY ./app .
COPY ./models ./models

# 5. Expose the port your app runs on
# Gunicorn will bind to this port
EXPOSE 8080

# 6. Define the command to run your application with Gunicorn
# "main:app" tells Gunicorn to look for a variable named "app" in a file named "main.py"
# --bind 0.0.0.0:8000 makes the server accessible from outside the container
# --workers 3 is a common starting point for the number of worker processes
CMD ["gunicorn", "-b", ":8080", "--workers", "3", "--threads", "4", "--timeout", "120", "main:app"]