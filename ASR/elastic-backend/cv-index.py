import pandas as pd  
from elasticsearch import Elasticsearch  
import logging  

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Elasticsearch host configuration
import os  
ES_HOST = os.getenv("ES_HOST", "http://es01:9200")  # Default to "http://es01:9200" if ES_HOST is not set
es = Elasticsearch([ES_HOST])  # Create Elasticsearch client

# Check connection to Elasticsearch
if not es.ping():
    logger.error(f"Cannot connect to Elasticsearch at {ES_HOST}. Please ensure it is running.")
    exit()

# Delete existing index if it exists
if es.indices.exists(index="cv-transcriptions"):
    es.indices.delete(index="cv-transcriptions")
    logger.info("Deleted existing index")

# Define the index mapping schema
mapping = {
    "mappings": {
        "properties": {
            "generated_text": {
                "type": "text",  # Full-text searchable field
                "fields": {
                    "keyword": {
                        "type": "keyword",  # Exact value searchable sub-field
                        "ignore_above": 256  # Ignore values longer than 256 characters
                    }
                }
            },
            "duration": {"type": "float"},  # Numeric field for duration
            "age": {"type": "integer"},  # Numeric field for age
            "gender": {"type": "keyword"},  # Categorical field for gender
            "accent": {"type": "keyword"}  # Categorical field for accent
        }
    }
}

# Create a new index with the specified mapping
es.indices.create(index="cv-transcriptions", body=mapping)
logger.info("Created new index with mapping")

# Load data from CSV
try:
    df = pd.read_csv("./cv-valid-dev-updated.csv")
    logger.info(f"Loaded {len(df)} records from the CSV.")
except FileNotFoundError as e:
    logger.error("CSV file not found. Ensure the file path is correct.")
    exit()

# Clean and preprocess data
df["duration"] = pd.to_numeric(df["duration"], errors="coerce").fillna(0)  # Convert duration to float, replace NaN with 0
df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(0)  # Convert age to integer, replace NaN with 0
df["gender"] = df["gender"].fillna("unknown")  # Replace missing gender values with "unknown"
df["accent"] = df["accent"].fillna("unknown")  # Replace missing accent values with "unknown"

# Initialize counters for success and error tracking
success_count = 0
error_count = 0

# Prepare data for bulk indexing
bulk_data = []
for i, row in df.iterrows():
    # Add metadata for the document
    bulk_data.append({"index": {"_index": "cv-transcriptions", "_id": str(i)}})
    # Add the document data
    bulk_data.append({
        "generated_text": row["generated_text"] if pd.notna(row["generated_text"]) else "unknown",
        "duration": float(row["duration"]),
        "age": int(row["age"]),
        "gender": str(row["gender"]),
        "accent": str(row["accent"]),
    })

    # Index documents in batches of 1000
    if len(bulk_data) >= 1000:
        try:
            response = es.bulk(operations=bulk_data, refresh=True)  # Bulk index the documents
            if not response["errors"]:
                success_count += len(bulk_data) // 2  # Each document has metadata and data, so divide by 2
            else:
                error_count += sum(1 for item in response["items"] if "error" in item["index"])
            logger.info(f"Processed {success_count} documents")
        except Exception as e:
            logger.error(f"Bulk indexing error: {e}")
            error_count += len(bulk_data) // 2
        bulk_data = []  # Clear the batch

# Index remaining documents if any
if bulk_data:
    try:
        response = es.bulk(operations=bulk_data, refresh=True)
        if not response["errors"]:
            success_count += len(bulk_data) // 2
        else:
            error_count += sum(1 for item in response["items"] if "error" in item["index"])
    except Exception as e:
        logger.error(f"Bulk indexing error: {e}")
        error_count += len(bulk_data) // 2

# Logging the indexing results
logger.info(f"Indexing complete: {success_count} succeeded, {error_count} failed.")
