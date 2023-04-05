var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const BASE_URL = "https://content.guardianapis.com/"
const API_KEY = "939f4eba-51b1-445e-b510-cc5670eb962c"

app.get('/', async (req, res) => {
  var section = "search"
  const url = `${BASE_URL}${section}?api-key=${API_KEY}`;
  const options = {
      method: 'GET'
  };
  const response = await fetch(url, options)
      .then(res => res.json())
      .catch(e => {
          console.error({
              "message": "error",
              error: e,
          });
      });
  articles = response['response']['results']
  
  res.render("index", {text: articles});
});

app.get('/:section', async (req, res) => {
  section = req.params.section
  const url = `${BASE_URL}${section}?api-key=${API_KEY}`;
  const options = {
      method: 'GET'
  };
  const response = await fetch(url, options)
      .then(res => res.json())
      .catch(e => {
          console.error({
              "message": "error",
              error: e,
          });
      });
  articles = response['response']['results']
  
  res.render(`${section}`, {text: articles});
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
