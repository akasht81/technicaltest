from fastapi import FastAPI, UploadFile, HTTPException
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
from pydub import AudioSegment
import os

app = FastAPI()

# Load the Wav2Vec2 model and processor
model_name = "facebook/wav2vec2-large-960h"
processor = Wav2Vec2Processor.from_pretrained(model_name)
model = Wav2Vec2ForCTC.from_pretrained(model_name)

@app.get("/ping")
async def ping():
    """Ping API to check if the service is running."""
    return {"message": "pong"}

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile):
    """Transcribes an audio file using Wav2Vec2."""
    # Check if file is audio
    if file.content_type not in ["audio/wav", "audio/x-wav", "audio/mpeg"]:
        raise HTTPException(status_code=400, detail="Invalid audio file type. Please upload a WAV or MP3 file.")

    try:
        # Save the uploaded file locally
        audio_path = f"temp_{file.filename}"
        with open(audio_path, "wb") as f:
            f.write(await file.read())

        # Convert audio to WAV with 16kHz sample rate if necessary
        if file.content_type != "audio/wav":
            audio = AudioSegment.from_file(audio_path)
            audio = audio.set_frame_rate(16000).set_channels(1)
            audio.export(audio_path, format="wav")
        
        # Load the WAV file
        audio = AudioSegment.from_file(audio_path)
        samples = torch.tensor(audio.get_array_of_samples(), dtype=torch.float32) / 32768.0

        # Transcription
        inputs = processor(samples, sampling_rate=16000, return_tensors="pt", padding=True)
        logits = model(**inputs).logits
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)[0]

        # Clean up
        os.remove(audio_path)
        return {"transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")
