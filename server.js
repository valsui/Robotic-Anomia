const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient
// use heroku port or 8000
const keys = require('./keys');
// API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(keys.db_dev, (err, client) => {
  if (err) return console.log(err)
  db = client.db('robotic-anomia');
  app.use(express.static('public'));
  app.db = db;
  require('./routes')(app);
  app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Listening on ${PORT}`);
  });
})
