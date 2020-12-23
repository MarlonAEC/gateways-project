var createError = require('http-errors');
var express = require('express');
const config = require('./config');
var swaggerJsdoc = require("swagger-jsdoc");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger');
const bodyParser = require('body-parser');
const cors = require('cors');


//Set up default mongoose connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var gatewaysRouter = require('./routes/gateway');
var peripheralRouter = require('./routes/peripheral');

const specs = swaggerJsdoc(options);

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', gatewaysRouter);
app.use('/api', peripheralRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// catching 404
app.use(function(req, res, next) {
  res.status(404).send("Not Found")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err.message : {};

  // render the error page
  console.log("THE ERROR:\n",err);
  res.status(err.status).send({message: err.message});
});

// app.listen(config.PORT, () => {
//   console.log(`App listening on port ${config.PORT}`);
// });

module.exports = app;
