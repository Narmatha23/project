const mongoose = require("mongoose");



const subjectSchema = new mongoose.Schema({
    registrationNumber:{
      type:String,
      required: true
    },
    department: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
   noOfSubjects: {
        type: Number,
        default:0
    },
    year: {
        type: String,
        required: true 
    },
  

})


const subject= mongoose.model("subject", subjectSchema);

module.exports = subject;

