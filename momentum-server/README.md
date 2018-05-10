# algovc

## Environment Setup
See the README in the project root for comprehensive dev environment setup instructions.   

## Running Migrations

* To create a new migration, run `migrate create -ext sql -dir ./migrations NAME` replacing name with a description of the migration
* To migrate up, run `make migrate-up`
* To migraste down, run `make migrate-down`


## Running for Dev
To start the server for dev, run:
    
````
make run
````

This will start the server on port 8080.
