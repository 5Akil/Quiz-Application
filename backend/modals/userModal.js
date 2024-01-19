const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    googleId:{
      type:String
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    designation: {
      type: String,
      // required: true
    },
    DOB: {
      type: String,
      // required: true
    },
    image: {
      type: String,
    },
    authBy:{
      type: String,
      required:true
    },
    country:{
      type: String,
      // required:true
    },
    state:{
      type:String,
    },
    city:{
      type: String,
    },
    gender:{
      type: String,
      // required:true
    },
    phoneCode:{
      type: String,
      // required:true
    },
    address:{
      type: String,
      // required:true
    },
    
    created_at : { type: Date, required: true, default: Date.now }  

  }
);

module.exports = model("user", userSchema);