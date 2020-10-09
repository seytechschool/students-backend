const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const router = require('./routes/api');
const path = require('path');
var exphbs = require('express-handlebars');
require('dotenv').config();

// app
const app = express();

// connect to db
const uri = process.env.MONGO_DB_URI;

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.log(err);
  throw err;
}
mongoose.connection.on('error', (err) => {
  console.log(err);
  throw err;
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

// routes
app.use('/api', router);

// listen
app.listen(port, () => {
  console.log(`Backend is running on port: ${port}`);
});
