var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var admin = require('firebase-admin');
const serviceAccount = require('./firebase/serviceAccountKey.json');
const path = require('path');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.send({error:err.message});
});

module.exports = app;
