import os
import requests
import pandas as pd
from tqdm import tqdm

# Configuration
API_URL = "http://localhost:8001/asr"  # The ASR API endpoint
AUDIO_FOLDER = "./cv-valid-dev"  # Path to the folder with audio files
CSV_PATH = "./cv-valid-dev.csv"  # Path to the CSV file
OUTPUT_CSV = "./cv-valid-dev-updated.csv"  # Path to save the updated CSV file

# Read the CSV file
df = pd.read_csv(CSV_PATH)

# Initialize a list to store transcriptions
generated_text = []

# Process each audio file in the dataset
for idx, row in tqdm(df.iterrows(), total=len(df), desc="Transcribing files"):
    audio_file = os.path.join(AUDIO_FOLDER, row["filename"])  # Assuming 'path' column has the file paths

    if not os.path.isfile(audio_file):
        print(f"File not found: {audio_file}")
        generated_text.append(None)
        continue

    try:
        # Send audio file to API
        with open(audio_file, "rb") as f:
            files = {"file": (row["filename"], f, "audio/mpeg")}
            response = requests.post(API_URL, files=files)

        # Handle API response
        if response.status_code == 200:
            transcription = response.json().get("transcription", "")
            generated_text.append(transcription)
        else:
            print(f"Error with file {audio_file}: {response.status_code} - {response.text}")
            generated_text.append(None)
    except Exception as e:
        print(f"Exception for file {audio_file}: {e}")
        generated_text.append(None)

# Add the transcriptions to a new column in the DataFrame
df["generated_text"] = generated_text

# Save the updated CSV file
df.to_csv(OUTPUT_CSV, index=False)
print(f"Updated CSV file saved to {OUTPUT_CSV}")
