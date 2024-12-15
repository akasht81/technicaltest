# Start from the official Elasticsearch image
FROM docker.elastic.co/elasticsearch/elasticsearch:8.10.1

# Switch to root user to perform setup
USER root

# Install Python and required tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Copy the custom script and CSV file
COPY cv-index.py /usr/share/elasticsearch/cv-index.py
COPY cv-valid-dev-updated.csv /usr/share/elasticsearch/cv-valid-dev-updated.csv
COPY wait-for-it.sh /usr/share/elasticsearch/wait-for-it.sh

# Install Python dependencies
RUN pip3 install --no-cache-dir elasticsearch pandas

# Ensure the files are owned by the 'elasticsearch' user
RUN chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/

# Make the wait-for-it script executable
RUN chmod +x /usr/share/elasticsearch/wait-for-it.sh

# Switch back to the 'elasticsearch' user
USER elasticsearch

# Set environment variables
ENV ES_JAVA_OPTS="-Xms512m -Xmx512m"
ENV PATH=$PATH:/usr/share/elasticsearch
ENV ES_HOST=http://es01:9200

# Run Elasticsearch in the background and execute the custom script
CMD ["/bin/bash", "-c", "elasticsearch & sleep 30 && python3 /usr/share/elasticsearch/cv-index.py && tail -f /dev/null"]




