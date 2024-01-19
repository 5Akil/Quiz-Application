const { Schema, model, default: mongoose } = require("mongoose");


const tokenSchema = new Schema(
    {
        userID: { type: mongoose.SchemaTypes.ObjectId, ref: "user" }, // ID of the user who took the quiz
        // googleId : {type: String},
        refresh_token: {type:String, required: true},                                  // refresh token
        createdAt: { type: Date, required: true },  
        // expireAt: { type: Date, required:true }                                          

    }
)


module.exports = model("token", tokenSchema);