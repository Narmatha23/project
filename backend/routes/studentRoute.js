const express = require('express')
const passport = require('passport');

const router = express.Router()

const {
    studentLogin,
    getAllStudents,
     getStudentByName,
     getStudentByRegNumber,
     getAllSubjects,fetchStudents,getMySubjects
}= require("../controller/studentController");



router.route("/login").post(studentLogin);

router.route("/getAllSubjects").get(getAllSubjects);

// helper route

router.route("/getAllStudents").get(getAllStudents);
// router.get('/getAllSubjects', passport.authenticate('jwt', { session: false }), getAllSubjects)

router.route("/getStudentByRegNumber").post(getStudentByRegNumber);

router.route("/getStudentByName").post(getStudentByName);

router.route("/fetchStudents").post(fetchStudents);

router.route("/getMySubjects").get(getMySubjects);


module.exports = router
