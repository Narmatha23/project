const express = require("express");
const router = express.Router();
const passport = require('passport')

// Controllers
const {
  addAdmin,
  adminLogin,
  // forgotPassword,
  // resetPassword,
  addStudent,
  addSubject,
  getAllStudents,
  getAllStudent,
  getAllSubject,
  fetchStudents

} = require("../controller/adminController");

router.route("/addAdmin").post(addAdmin);

router.route("/adminLogin").post(adminLogin);

// router.route("/forgotpassword").post(forgotPassword);

// router.route("/passwordreset/:resetToken").put(resetPassword);

// router.route("/getAllStudents").get(getAllStudents)

router.route("/getAllStudent").post(getAllStudent)

// router.route("/getAllSubject").post(getAllSubject)

router.route("/getAllSubject").get(getAllSubject)

router.route("/addstudent").post(addStudent)
// router.get('/getStudents', passport.authenticate('jwt', { session: false }), getAllStudents)

router.route("/fetchStudents").post(fetchStudents)

router.route('/addSubject').post (addSubject)


module.exports = router;

 




