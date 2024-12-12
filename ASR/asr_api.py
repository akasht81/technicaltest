from fastapi import FastAPI, UploadFile, HTTPException
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
from pydub import AudioSegment
import os
import io

app = FastAPI()

model_name = "facebook/wav2vec2-large-960h"
processor = Wav2Vec2Processor.from_pretrained(model_name)
model = Wav2Vec2ForCTC.from_pretrained(model_name)

@app.post("/asr")
async def asr(file: UploadFile):
    """API to transcribe audio and return transcription and duration."""
    if not file.filename.endswith(".mp3"):
        raise HTTPException(
            status_code=400, detail="Invalid file type. Please upload an MP3 file."
        )

    try:
        # Save uploaded file to disk
        temp_path = file.filename
        with open(temp_path, "wb") as temp_file:
            temp_file.write(await file.read())
        
        # Process audio
        audio = AudioSegment.from_file(temp_path, format="mp3")
        audio = audio.set_frame_rate(16000).set_channels(1)
        temp_wav_path = temp_path.replace(".mp3", ".wav")
        audio.export(temp_wav_path, format="wav")

        # Perform transcription
        samples = torch.tensor(AudioSegment.from_file(temp_wav_path).get_array_of_samples(), dtype=torch.float32) / 32768.0
        inputs = processor(samples, sampling_rate=16000, return_tensors="pt", padding=True)
        logits = model(**inputs).logits
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)[0]

        # Calculate duration
        duration = len(audio) / 1000  # Convert ms to seconds

        # Delete temporary files
        os.remove(temp_path)
        os.remove(temp_wav_path)

        # Return transcription and duration
        return {"transcription": transcription, "duration": f"{duration:.1f}"}

    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        if os.path.exists(temp_wav_path):
            os.remove(temp_wav_path)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")



