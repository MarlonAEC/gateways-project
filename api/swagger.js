const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Nodejs + MongoDB Gateway Management API with Swagger",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "ISC",
        },
        contact: {
          name: "Marlon Alejandro Espinosa Castañeiras",
          url: "https://github/MAEC",
          email: "marlonespinosa83@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    apis: ["./routes/gateway.js", "./routes/peripheral.js"],
  }

  module.exports = options;