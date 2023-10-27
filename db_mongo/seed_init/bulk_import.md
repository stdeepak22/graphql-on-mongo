## Run the mongoDB using the docker compose file -
>docker compose up -d

this will pull mongoDB and Mongo-express docker image and will start both. mongo express just to explore the mongo db in browser directly.

## run docker PS and identify the mongodb container name 
> docker ps -f "name=mongo-db" --format {{.Names}}

which will ouput the name of the container something like - 
>db_mongo-mongo-db-1

and next we will run another commant to move the local json files with dummy data to this contianer, so we can import this json data to mongo db.

## Move local json file to container
>docker cp ./dummy-data/ db_mongo-mongo-db-1:/tmp/

this will move the directory where we have 3 json files inside docker containers `/tmp/dummy-data/` directory.

## Now we will connect to container and will do bulk import inside container.
>  docker exec -it db_mongo-mongo-db-1 sh

this will open the `sh` on the mongodb container, and we can run `mongoimport` there. We will run the below 3 imports one by one, but `remember to navigate to right path inside the docker container` using below -
>`cd /tmp/dummy-data`

Now, lets import all 3 json files, below lines importing `json` files to individual collections named - `users, restaurants and reviews` inside `restaurants_reviews` DB. 

1. `mongoimport --authenticationDatabase admin -u root_secure -p pass_secure --db restaurants_reviews --collection users --file ./30_Users.json --jsonArray`
2. `mongoimport --authenticationDatabase admin -u root_secure -p pass_secure --db restaurants_reviews --collection restaurants --file ./100_Restaurants.json --jsonArray`
3. `mongoimport --authenticationDatabase admin -u root_secure -p pass_secure --db restaurants_reviews --collection reviews --file ./294_Reviews.json --jsonArray`

by now you should have `30 users`, `100 Restaurants` and `294 reviews` of the restaurants by these users.

We can opent he http://localhost:8081 to access the mongo express to see this data under `restaurants_reviews` db.