const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");



const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
//     subjects:[
//         {
//        type: mongoose.Schema.Types.ObjectId,
//        ref:'subject',
//     }
// ],
    registrationNumber: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },

   resetPasswordToken: String,
  resetPasswordExpire: Date,

})



// studentSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  
  // studentSchema.methods.matchPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };
  
//  studentSchema.methods.getSignedJwtToken = function () {
//     return jwt.sign({  id: student.id, student }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });
//   };
  
//  studentSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     // Hash token (private key) and save to database
//     this.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
  
//     // Set token expire date
//     this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
//     return resetToken;
//   };

const student= mongoose.model("student", studentSchema);

module.exports = student;
