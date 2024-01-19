const { Schema, model, default: mongoose } = require("mongoose");


const quizSchema = new Schema(
    {
        title : {type: String ,  required: true,},
        totalTime : {type: String ,  required: true,} ,
        questions:[{ type: mongoose.SchemaTypes.ObjectId, ref: "questions"  }],
        
    }
)

module.exports= model ("quiz" , quizSchema)
