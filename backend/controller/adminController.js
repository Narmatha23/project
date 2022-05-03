const crypto = require("crypto")
  
const bcrypt = require('bcryptjs')


const jwt = require('jsonwebtoken')
// validation

const validateStudentRegisterInput = require('../validation/studentRegister')

const validateSubjectRegisterInput = require('../validation/subjectRegister')

const validateAdminRegisterInput   = require('../validation/adminRegister')

const validateAdminLoginInput = require('../validation/adminLogin');

const validateFetchStudentsInput = require('../validation/facultyFetchStudent')

// model
const Admin = require ("../models/adminModel.js");
const Student = require ("../models/studentModel.js");
const Subject = require ("../models/subjectModel.js");




const ErrorResponse = require ("../util/errorResponse");
const sendEmail = require ("../util/sendEmail");


module.exports = {

  // register
  addAdmin: async (req, res, next) => {
    try {
        const { errors, isValid } = validateAdminRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        const {  email, dob, name} = req.body
        const admin = await Admin.findOne({ email })
        if (admin) {
            errors.email = "Email already exist"
            return res.status(400).json(errors)
        }
       

        
        let hashedPassword;
        hashedPassword = await bcrypt.hash(dob, 10)
        
        const newAdmin = await new Admin({
            email,
            name,
            password: hashedPassword,
            dob
        })
        await newAdmin.save()
        res.status(200).json({ result: newAdmin })
    }
    catch (err) {
        res.status(400).json({ message: `error in adding new admin", ${err.message}` })
    }

},



// @desc    Login user
adminLogin: async (req, res, next) => {
    try {
        const { errors, isValid } = validateAdminLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email })
        if (!admin) {
            errors.email = 'Registration number not found';
            return res.status(404).json(errors);
        }
        const isCorrect = await bcrypt.compare(password, admin.password)
        if (!isCorrect) {
            errors.password = 'Invalid Credentials';
            return res.status(404).json(errors);
        }
        const payload = {
            id: admin.id,name: admin.name, email: admin.email
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 7200 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
    }
    catch (err) {
        console.log("Error in admin login", err.message)
    }
    
},


// // @desc    Forgot Password Initialization
//  forgotPassword : async (req, res, next) => {
//   // Send Email to email provided but first check if user exists
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return next(new ErrorResponse("No email could not be sent", 404));
//     }

//     // Reset Token Gen and add to database hashed (private) version of token
//     const resetToken = user.getResetPasswordToken();

//     await user.save();

//     // Create reset url to email to provided email
//     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

//     // HTML Message
//     const message = `
//       <h1>You have requested a password reset</h1>
//       <p>Please make a put request to the following link:</p>
//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
//     `;

//     try {
//       await sendEmail({
//         to: user.email,
//         subject: "Password Reset Request",
//         text: message,
//       });

//       res.status(200).json({ success: true, data: "Email Sent" });
//     } catch (err) {
//       console.log(err);

//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save();

//       return next(new ErrorResponse("Email could not be sent", 500));
//     }
//   } catch (err) {
//     next(err);
//   }
// },
// // @desc    Reset User Password
//  resetPassword : async (req, res, next) => {
//   // Compare token in URL params to hashed token
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.resetToken)
//     .digest("hex");

//   try {
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return next(new ErrorResponse("Invalid Token", 400));
//     }

//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     res.status(201).json({
//       success: true,
//       data: "Password Updated Success",
//       token: user.getSignedJwtToken(),
//     });
//   } catch (err) {
//     next(err);
//   }
// },
addStudent: async (req, res, next) => {
  try {
      const { errors, isValid } = validateStudentRegisterInput(req.body);

      if (!isValid) {
          return res.status(400).json(errors)
      }
      const { name, email, year, 
          gender, department, dob,registrationNumber,semester } = req.body
      
      const student = await Student.findOne({ registrationNumber })
      if (student) {
        errors.registrationNumber = "registrationNumber already exist"
        return res.status(400).json(errors)
    }
    
    let hashedPassword;
    hashedPassword = await bcrypt.hash(dob, 10)
   
      const newStudent = await new Student({
          name,
          email,
          password: hashedPassword,
          year,
          gender,
          registrationNumber,
          department,
          dob,
          semester
      })
      await newStudent.save()
    //   const subjects = await Subject.find({ year })
    //   if (subjects.length !== 0) {
    //       for (var i = 0; i < subjects.length; i++) {
    //           newStudent.subjects.push(subjects[i]._id)
    //       }
    //   }
    //   await newStudent.save()
      res.status(200).json({ result: newStudent })
  }
  catch (err) {
      res.status(400).json({ message: `error in adding new student", ${err.message}` })
  }

},

addSubject: async (req, res, next) => {
  try {
      const { errors, isValid } = validateSubjectRegisterInput(req.body)
      //Validation
      if (!isValid) {
          return res.status(400).json(errors)
      }
      const { subjectCode,
        subjectName,department,year,registrationNumber,semester} = req.body
    //   const subject = await Subject.find({subjectCode , registrationNumber})
    //   if (subject) {
    //     return res.status(404).json({ message: "subject already added" })
    //   }
      const newSubject = await new Subject({
        department,
        subjectCode,
        subjectName,
        year,
       semester,
       registrationNumber
    })
    await newSubject.save()
    // const students = await Student.find({department,year})
    // if (students.length === 0) {
    //     errors.department = "No branch found for given subject"
    //     return res.status(400).json(errors)
    // }
    // else {
    //     for (var i = 0; i < students.length; i++) {
    //         students[i].subjects.push(newSubject._id)
    //         await students[i].save()
    //     }
    //     res.status(200).json({ newSubject })
    // }
    res.status(200).json({ newSubject })
}
  catch (err) {
      console.log(`error in adding new subject", ${err.message}`)
  }
},
getAllStudent: async (req, res, next) => {
    try {
        const { department, year } = req.body
        const allStudent = await Student.find({ department:department, year:year })
        res.status(200).json({ result:allStudent })
    }
    catch (err) {
        console.log("Error in gettting all students", err.message)
    }
},
getAllSubject: async (req, res, next) => {
    try {
        const { department, year } = req.body
        const allSubjects = await Subject.find({ department:department, year:year})
        res.status(200).json({ result: allSubjects })
    }
    catch (err) {
        console.log("Error in gettting all students", err.message)
    }
},





fetchStudents: async (req, res, next) => {
    try {
        const { errors, isValid } = validateFetchStudentsInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber,department, year } = req.body;
        const subjectList = await Subject.find({ registrationNumber,department, year })
        if (subjectList.length === 0) {
            errors.department = 'No Subject found in given department';
            return res.status(404).json(errors);
        }

        const students = await Student.find({ registrationNumber,department, year })
        if (students.length === 0) {
            errors.department = 'No Student found'
            return res.status(404).json(errors);
        }
        res.status(200).json({
            result: students.map(student => {
                var student = {
                    _id: student._id,
                    registrationNumber: student.registrationNumber,
                    name: student.name
                }
                return student
            }),
            subjectCode: subjectList.map(sub => {
                return sub.subjectCode
            })
        })
    }
    catch (err) {
        console.log("error in faculty fetchStudents", err.message)
    }

},

}




// const sendToken = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();
//   res.status(statusCode).json({ sucess: true, token });
// };



