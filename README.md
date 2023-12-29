This is a basic NodeJS project template consisting of most of the important folders and configurations which should be created keeping in mind the code principles.

`src` -> all the source code regarding the project setup. This is to seperate out tests.

Coming inside the `src` folder we have the following folders:

- `config` -> consists the setup of configurations/library/module. for e.g setting up of dotenv so that environment variables can be accessesd in cleaner manner. We have also done the setup of logging library here to produce meaningful logs.

- `routes` -> in this we register a route and corresponding controller/middlewares.

- `middlewares` -> to intercept the incoming request where we can write our authenticators/validators etc.

- `controllers` -> they are last middlewares as after them we call the buisness layer to execute the buisness logic. In controllers we recieve the incoming request and pass on to buisness layer and after recieving output from business layer, we structure the resposne and send the output.

- `repositories` -> contains all the logic using which we interact with db by writing raw queries/ ORM queries.

- `services` -> contains the buisness logic and intercats with repositories for accessing data from db.

- `utils` -> contains the helper methods.

### Setting up the project:

- Clone this repository.

- Go inside the folder path and execute the following command :

  ```
  npm i
  ```

- In the root directory create a .env file and add the following environment variables:

  ```
  PORT = <port number of your choice>
  ```

- To store the logs create a combined.log file in the root directory.

- Go to the `src` folder and execute the command:

  ```
  npx sequelize init --force
  ```

- This will create a `config.json` file in the `config` folder and create migrations, models, and seeders folder.

- If you are setting up the development environment , then in the `config.json` file , replace the username and password of your db and same for test and production environment (host also for test and production env). Also you can replace the dialect you want to use but then also install it as a npm package. we have dialect as mysql therefore we have a dependency of mysql2 in the package.json file.

- To run the server execute the command :

  ```
  npm start
  ```

- Go to `src` folder and execute the following command to create the database:

  ```
  npx sequelize db:create
  ```

- Then to create the table Airplane execute

  ```
  npx sequelize model:create --name Airplane --attributes ModelNumber:string,Capacity:integer
  ```
