const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const moment = require('moment'); // require
const fs = require('fs/promises');

const contactsRouter = require('./routes/api/recipes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format();
  await fs.appendFile(
    './public/server/server.log',
    `\n${method} ${url} ${date}`
  );
  next();
});

app.use('/api/recipes', contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  // res.status(404).json({
  //   message: 'Not Found',
  // });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // const { status = 500, message = 'Server Error' } = err;
  // res.status(status).json({ message });
});

module.exports = app;
