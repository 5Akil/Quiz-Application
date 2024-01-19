const { Schema, model, default: mongoose } = require("mongoose");


const forgotPasswordTokenSchema = new Schema(
    {
        token: { type: String, required: true },
        createdAt: { type: Date, required: true },
    }
)

module.exports = model("forgotPasswordToken", forgotPasswordTokenSchema)
