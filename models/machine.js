const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  machine : {}
});

module.exports = mongoose.model('Machine', MachineSchema);
