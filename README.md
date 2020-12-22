# gateways-project
A simple project of a REST API with NodeJs, MongoDB, Create-React-Application, Redux some unit test in Chai-Http.

## Logic of the application
REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. This information is stored in the database.
When storing a gateway, any field marked as “to be validated” must be validated and an
error returned if it is invalid. Also, no more than 10 peripheral devices are allowed for a
gateway.
The service must also offer an operation for displaying information about all stored gateways
(and their devices) and an operation for displaying details for a single gateway. Finally, it
must be possible to add and remove a device from a gateway.
Each gateway has:
- a unique serial number (string),
- human-readable name (string),
- IPv4 address (to be validated),
- multiple associated peripheral devices.

Each peripheral device has:
- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

## Technologys used
- [NodeJs v12.18.3](https://nodejs.org) for the server
- [MongoDB v4.4.2](https://mongodb.com) NoSQL database
- [Mongoose v5.11.8](https://mongoosejs.com) ORM
- [Express v4.16.1](https://expressjs.com) framework for NodeJs
- [Swagger v2.0](https://swagger.io) with [OpenAPI v3.0.0](https://openapis.org) for document the API
- [ReactJs v](https://reactjs.org) with the [create-react-application](https://create-react-app.dev/docs/getting-started) command
- [Redux v4.0.5](https://redux.js.org) 
- [Chai-Http v4.3.0](https://chaijs.com/plugins/chai-http) for unit test the API

## Project structure
This repository is structured in a specific way
```
-api
-client
...
```
The `api` folder holds all the source code of the NodeJs + Express + MongoDb application and there is  `README.md` file with the installation process of the API. The `client` folder holds all the source code from the React + Redux application and also there is a `README.md` file with the installation process for the `client`.

## Contact
Marlon A. Espinosa Castañeiras
- Email: marlonespinosa83@gmail.com
- Linkedin: [Marlon A. Espinosa Castañeiras](https://www.linkedin.com/in/marlonaec)
