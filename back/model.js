const mongoose = require('mongoose');

// data schema for client
const dataSchema = new mongoose.Schema({
  title: String,
  data: []
});

module.exports = mongoose.model('Data', dataSchema);
