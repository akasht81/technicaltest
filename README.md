# technicaltest

conda environment :

conda activate takehometest

Python 3.9.20

Task 0 

running application : uvicorn asr_api:app --host 0.0.0.0 --port 8001

Task 1 

curl -F "file=@C:\\Users\\akash\\Documents\\GitHub\\technicaltest\\ASR\\cv-valid-dev\\cv-valid-dev\\sample-000000.mp3" http://localhost:8001/asr

results : 

{"transcription":"SHE COMPOSED AN EMOTIONAL SONG IN HER BEDROOM","duration":"3.2"}

Task 2 

python cv-decode.py

Task 3 

docker build -t asr-api .
docker run -p 8001:8001 --name asr-api-container asr-api

Task 4

docker-compose up -d
docker ps
docker logs es01
docker logs es02
curk http://localhost:9200
curl http://localhost:9200/cv-transcriptions/_search?pretty

deleting existing indexing
curl -X DELETE http://localhost:9200/cv-transcriptions

checking indexing
curl http://localhost:9200/cv-transcriptions/_search?pretty

curl "http://localhost:9200/cv-transcriptions/_search?pretty&size=20" - to show more than 10 which is the default
