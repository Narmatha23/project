const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Student = require('../models/studentModel')
const Subject = require('../models/subjectModel')


const key = require('../config/key')


const validateStudentLoginInput = require('../validation/studentLogin')

const ErrorResponse = require ("../util/errorResponse");
const sendEmail = require ("../util/sendEmail");

module.exports = {
    studentLogin: async (req, res, next) => {
        const { errors, isValid } = validateStudentLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber, password } = req.body;

        const student = await Student.findOne({ registrationNumber })
        if (!student) {
            errors.registrationNumber = 'Registration number not found';
            return res.status(404).json(errors);
        }
        const isCorrect = await bcrypt.compare(password, student.password)
        if (!isCorrect) {
            errors.password = 'Invalid Credentials';
            return res.status(404).json(errors);
        }
        const payload = { id: student.id, student };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );


    },
    getAllStudents: async (req, res, next) => {
        try {
            const { registrationNumber, name} = req.body;
            const students = await Student.find({ registrationNumber, name})
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },

    getStudentByName: async (req, res, next) => {
        try {
            const { name } = req.body
            const students = await Student.find({ name })
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },

    getStudentByRegNumber: async (req, res, next) => {
        try {
            const { registrationNumber } = req.body
            const students = await Student.findOne({ registrationNumber })
            if (!students) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },

    getAllSubjects: async (req, res, next) => {
        try {
            const { registrationNumber} = req.query;
            const subjects = await Subject.find({registrationNumber:registrationNumber})
            if (subjects.length === 0) {
                return res.status(404).json({ message: "No subjects founds" })
            }
            res.status(200).json({result: subjects })
        }
        catch (err) {
            return res.status(400).json({"Error in getting all subjects":err.message})
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
    arrearSubjects:async(req,res,next)=>{
        try{
            const studentId = req.user._id
                const arrearSubject = await Subject.find({ student: studentId })
                if(!arrearSubject){
                    res.status(400).json({ message: "Attendence not found" })
                }
                res.status(200).json({
                    result: arrearSubject.map(arr => {
                        let res = {};
                        res.subjectCode = arr.subject.subjectCode
                        res.subjectName = arr.subject.subjectName
                        return res
                    })
                })
            }
            catch (err) {
                console.log("Error in fetching attendence",err.message)
            }
        },
        getMySubjects: async (req, res) => {
            const subjects = await Subject.find({ registrationNumber})
            res.json(subjects)
          }
}

