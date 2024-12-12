# Use a Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# Copy project files
COPY asr_api.py .
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for the FastAPI application
EXPOSE 8001

# Run the application
CMD ["uvicorn", "asr_api:app", "--host", "0.0.0.0", "--port", "8001"]
