const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000;
  // use heroku port or 8000
  // API routes

  app.use(express.static('public'));
  app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Listening on ${PORT}`);
  });
