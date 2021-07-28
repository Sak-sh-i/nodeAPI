var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var imagesRouter = require('./routes/images');
var testAPIRouter = require('./routes/testAPI');
var app = express();

dotenv.config({ path: "./config.env" });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cors function
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(
  cors({
    origin: "*", // restrict calls to these addresses
  })
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/images', imagesRouter);
app.use("/testAPI", testAPIRouter);

// Static path
const buildPath = path.join(__dirname, 'public');
app.use(express.static(buildPath));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// connect to mongdb
const DB = process.env.DATABASE_CLOUD

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = app;
