import pandas as pd
from elasticsearch import Elasticsearch
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to Elasticsearch
es = Elasticsearch(["http://localhost:9200"])
if not es.ping():
    logger.error("Cannot connect to Elasticsearch. Please ensure it is running.")
    exit()

# Load and clean CSV data
try:
    df = pd.read_csv("./cv-valid-dev-updated.csv")
    logger.info(f"Loaded {len(df)} records from the CSV.")
except FileNotFoundError as e:
    logger.error("CSV file not found. Ensure the file path is correct.")
    exit()

# Replace NaN in numeric fields with 0
df["duration"] = pd.to_numeric(df["duration"], errors="coerce").fillna(0)
df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(0)

# Replace NaN in categorical fields with "unknown"
df["gender"] = df["gender"].fillna("unknown")
df["accent"] = df["accent"].fillna("unknown")

# Index records
success_count, error_count = 0, 0
# for i, row in df.iterrows():
#     doc = {
#         "generated_text": row["generated_text"],
#         "duration": row["duration"],
#         "age": row["age"],
#         "gender": row["gender"],
#         "accent": row["accent"],
#     }
#     try:
#         es.index(index="cv-transcriptions", id=i, body=doc)
#         success_count += 1
#         logger.info(f"Indexed document ID {i}")
#     except Exception as e:
#         error_count += 1
#         logger.error(f"Error indexing document ID {i}: {e}")

# logger.info(f"Indexing complete: {success_count} succeeded, {error_count} failed.")

for i, row in df.iterrows():
    doc = {
        "generated_text": row["generated_text"] if pd.notna(row["generated_text"]) else "unknown",  # Handle NaN here
        "duration": row["duration"],
        "age": row["age"],
        "gender": row["gender"],
        "accent": row["accent"],
    }
    try:
        es.index(index="cv-transcriptions", id=i, body=doc)
        success_count += 1
        logger.info(f"Indexed document ID {i}")
    except Exception as e:
        error_count += 1
        logger.error(f"Error indexing document ID {i}: {e}, Document: {doc}")


logger.info(f"Indexing complete: {success_count} succeeded, {error_count} failed.")


