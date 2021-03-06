const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-ALlow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/note', require('./routes/apiNote'));

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
  console.log('Note app server listening on port ' + app.get('port') + '!');
});

/* Connect Mongo DB */
mongoose.connect('mongodb://127.0.0.1/note-app');

mongoose.connection.on('error', (err) => {
  console.error(err);
});