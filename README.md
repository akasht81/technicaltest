### technicaltest

I created a conda environment to run the project in. 

Conda environment creation : 

conda create --name takehometest python=3.9
conda activate takehometest

clone this repo and cd into the main directory
pip install -r requirements.txt

verify all the files are install by using : pip list


Once you are done using the environment :

conda deactivate
conda remove --name takehometest --all

## Task 1 :

For the first task related to asr_api.py to run the application : 

running application : uvicorn asr_api:app --host 0.0.0.0 --port 8001

Open another cmd and type this in :

curl -F "file=@C:\\Users\\akash\\Documents\\GitHub\\technicaltest\\ASR\\cv-valid-dev\\cv-valid-dev\\sample-000000.mp3" http://localhost:8001/asr

results : 

{"transcription":"SHE COMPOSED AN EMOTIONAL SONG IN HER BEDROOM","duration":"3.2"}

![alt text](image.png)

## Task 2 :

python cv-decode.py

After running this a new column will be formed in the new csv file called cv-valid-dev-updated.csv 

## Task 3 : 

After dockerizing the application, you can run it this way to do task 1.

docker build -t asr-api .
docker run -p 8001:8001 --name asr-api-container asr-api

## Task 4 : 

docker-compose build, to build the multi-container consisting of the elastic search container as well as the search ui container
docker-compose up -d once built
open your browser and type http://localhost:3000

![alt text](image-1.png)

You can also use the filter function as shown below :

![alt text](image-2.png)

You can also use the search function accordingly :

![alt text](image-3.png)

Trouble shooting steps used by me, not relevant to setup : 

docker logs es01
docker logs es02
curk http://localhost:9200
curl http://localhost:9200/cv-transcriptions/_search?pretty

deleting existing indexing
curl -X DELETE http://localhost:9200/cv-transcriptions

checking indexing
curl http://localhost:9200/cv-transcriptions/_search?pretty

curl "http://localhost:9200/cv-transcriptions/_search?pretty&size=20" - to show more than 10 which is the default

yarn install
yarn run build 
yarn start
/mnt/c/Users/akash/Documents/GitHub/technicaltest/ASR/search-ui/node_modules$ yarn add @elastic/search-ui @elastic/react-search-ui @elastic/react-search-ui-views -W