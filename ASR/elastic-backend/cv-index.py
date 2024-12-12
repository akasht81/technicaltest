import pandas as pd
from elasticsearch import Elasticsearch
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to Elasticsearch
es = Elasticsearch(["http://localhost:9200"])

# Load and clean CSV data
df = pd.read_csv("./cv-valid-dev-updated.csv")

# Replace NaN in numeric fields with 0
df["duration"] = pd.to_numeric(df["duration"], errors="coerce").fillna(0)
df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(0)

# Replace NaN in categorical fields with "unknown"
df["gender"] = df["gender"].fillna("unknown")
df["accent"] = df["accent"].fillna("unknown")

# Index records
for i, row in df.iterrows():
    doc = {
        "generated_text": row["generated_text"],
        "duration": row["duration"],
        "age": row["age"],
        "gender": row["gender"],
        "accent": row["accent"],
    }
    try:
        es.index(index="cv-transcriptions", id=i, body=doc)
        logger.info(f"Indexed document ID {i}")
    except Exception as e:
        logger.error(f"Error indexing document ID {i}: {e}")
