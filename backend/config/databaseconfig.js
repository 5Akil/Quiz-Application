const mongoose =require("mongoose");


const connect = async(DATABASE_URL)=>{

    try {
        await mongoose.connect(DATABASE_URL)
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect