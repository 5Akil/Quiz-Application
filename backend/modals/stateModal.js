const { Schema, model } = require('mongoose');


const stateSchema = new Schema({
  id: Number,
  name: String,
  country_id: Number,
});

stateList = model("stateList", stateSchema ,"stateList");

module.exports = stateList
