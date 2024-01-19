const { Schema, model } = require('mongoose');


const citySchema = new Schema({
  name: String,
  state_id: Number,
  country_id: Number,
});

cityList = model("cityList", citySchema ,"cityList");

module.exports = cityList;
