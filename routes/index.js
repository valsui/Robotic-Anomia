const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  let root = path.join(__dirname + '../../..');
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
