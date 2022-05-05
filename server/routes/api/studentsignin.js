const express = require("express");
const router = express.Router();

//import the models
const Student = require("../../models/Student");
const StudentSession = require("../../models/StudentSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { regNo, password } = body;

  //make sure they are not blank
  if (!regNo) {
    return res.send({
      success: false,
      message: "Registration Number field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
  Student.find({ regNo }, (err, students) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    if (students == 0) {
      return res.send({
        success: false,
        message: "The Student does not exist",
      });
    }

    //user does exist
    //check if password is correct for that particular admin
    const student = students[0];
    if (!student.validPassword(password)) {
      return res.send({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Everything is OK
    //create an student session

    const newStudentSession = new StudentSession({
      studentId: student.id,
    });

    //save the new user session

    newStudentSession.save((err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "User Successfully Signed In",
        token: session.id,
      });
    });
  });
});

module.exports = router;
