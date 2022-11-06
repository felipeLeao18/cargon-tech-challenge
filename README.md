# CargOn
  tech challenge

## <a name="how-to-run">How to run</a>
**Install npm packages**

    $ npm i

**Setup your env keys**
- Create a .env file and copy the [.env.example](.env.example) file, you can change the DATABASE_URL based on your machine

**Start local Database with [docker compose](https://docs.docker.com/compose/)**

    $ docker-compose -f start-db-locally.yml up
    
- You can also start local db with [setup-locally-db](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-linux)

**Run migrations**

    $ npx prisma migrate dev
  
**Run the app**

    $ npm run dev
 
 

## Running tests 
- Note: this step requires [Docker Compose](https://docs.docker.com/compose/) to be installed on your computer

**Start local Database memory server with [Docker Compose](https://docs.docker.com/compose/)**

    $ npm run test-setup
   
  - note: The command above will already create your migrations on your memory server db
 
 **After stop running tests, drop the container containing the memory server Db**
 
    $ npm run docker:down
    
    

## Docs
[run](#how-to-run) your app

Go to http://localhost:port/docs-api
