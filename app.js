var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

//////////////////
const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//////////////////

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
const DB = "mongodb://sakshi:ghostingtheghostbuster@cluster0-shard-00-00.j36x1.mongodb.net:27017,cluster0-shard-00-01.j36x1.mongodb.net:27017,cluster0-shard-00-02.j36x1.mongodb.net:27017/excalidraw-app?ssl=true&replicaSet=atlas-9bg0nn-shard-0&authSource=admin&retryWrites=true&w=majority";

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
