
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone_code: String,
  
});

const countryList = mongoose.model('countryList', countrySchema , "countryList");

module.exports = countryList;
