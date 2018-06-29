const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient
// use heroku port or 8000
const URL = require('./keys.js').mongoURI;

// app.get('/', (request, response) => {
//   res.sendFile(__dirname + '/weights.html');
// })

MongoClient.connect(URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db('robotic-anomia');
  app.post('/machines', (req, res) => {
    db.collection('machines').save(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log('saved machine to database');
    })
  })
  app.get('/machines', (req, res) => {
    let cursor = db.collection('machines').find().toArray(function(err, results) {
      return results; 
    })
  })
  app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Listening on ${PORT}`);
  });
})
