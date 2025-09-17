FROM python:3.10-slim

# Work at project root in the container
WORKDIR /app



# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your project (keep app/ as a folder, do NOT flatten)
COPY ./app ./app
COPY ./models ./models
# (copy any other root files you need, e.g. config, .py files in root)

ENV CUDA_VISIBLE_DEVICES=-1
ENV NVIDIA_VISIBLE_DEVICES=void
ENV TF_CPP_MIN_LOG_LEVEL=0
# (optional) If you want identical numerics to non-oneDNN builds:
# ENV TF_ENABLE_ONEDNN_OPTS=0


# Container listens on 8080
ENV PORT=8080
EXPOSE 8080

# Run from project root, importing Flask app at app/main.py -> app
CMD ["sh","-c","gunicorn --bind 0.0.0.0:${PORT:-8080} --workers 1 --threads 4 --timeout 180 app.main:app"]