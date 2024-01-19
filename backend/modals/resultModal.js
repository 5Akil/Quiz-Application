const { Schema, model, default: mongoose } = require("mongoose");


const resultSchema = new Schema(
    {
        userID: { type: mongoose.SchemaTypes.ObjectId, ref: "user" , required: true  }, // ID of the user who took the quiz
        quizID: { type: mongoose.SchemaTypes.ObjectId, ref: "quiz" , required: true}, // ID of the quiz
        marks: Number,                                                                   // Score achieved by the user
        correctAnswers: { type: Object ,required:true},   
        userSelectedAnswers:{type: Object ,required:true} ,
        startTime:{
            type:Date,
            required:true
        },                                          
        endTime: {
            type: Date,
        },
        totalTime:{
            type: String,
            required : true
        },
        totalMarks:{
            type:Number,
            required:true
        },
        timeStamps:{
            type: Date,
            default: Date.now(),
        },
        timeTaken:{
            type: String,
            required: true
        },
        percentage:{
            type: Number,
            required:true,
        }


    }
)


module.exports = model("result", resultSchema);
