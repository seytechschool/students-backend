const express = require('express');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const mongoose = require('mongoose');
require('dotenv').config();
var exphbs = require('express-handlebars');

var router = require('./routes/api');
const port = process.env.PORT || 5000;

// app
const app = express();

// db
const uri = process.env.MONGO_DB_URI;

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.log('err', err);
  throw err;
}
mongoose.connection.on('error', (err) => {
  console.log(err);
  throw err;
});

// views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routes
app.get('/', function (req, res) {
  res.render('home');
});
app.use('/api', router);

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

app.listen(port, () => console.log(`Backend is running on ${port}`));
