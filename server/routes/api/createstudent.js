const express = require("express");
const router = express.Router();

//import the model
const Student = require("../../models/Student");
const Fees = require("../../models/FeesDepartment");
const Library = require("../../models/LibraryDepartment");
const Games = require("../../models/GamesDepartment");

router.post("/", (req, res) => {
  let { body } = req;
  let { regNo, password, name, course } = body;

  //make sure the fields are not null

  if (!regNo) {
    res.send({
      success: false,
      message: "registartion number field is empty",
    });
  }
  if (!password) {
    res.send({
      success: false,
      message: "password field is empty",
    });
  }
  if (!name) {
    res.send({
      success: false,
      message: "name Field is empty",
    });
  }
  if (!course) {
    res.send({
      success: false,
      message: "Course Field is empty",
    });
  }

  //make sure that the username does not exist
  Student.find({ regNo }, (err, students) => {
    if (err) {
      res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (students != 0) {
      res.send({
        success: false,
        message: "The student already exists",
      });
    }

    //the student is new
    //save the student
    const newStudent = new Student({
      regNo,
      password,
      name,
      course,
    });

    //encrypt the password
    newStudent.password = newStudent.generateHash(password);

    newStudent.save((err, student) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "New Student " + name + " Registered",
      });
    });

    //save student information
    //in other departments collections

    //Fees Departmenr
    const FeesCollection = new Fees({
      regNo,
      name,
    });

    FeesCollection.save((err, student) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error @Fees_Department",
        });
      }
    });

    //Games Department
    const GamesCollection = new Games({
      regNo,
      name,
    });
    GamesCollection.save((err, student) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error @Games_Department",
        });
      }
    });

    //LibraryDepartment
    const LibraryCollection = new Library({
      regNo,
      name,
    });
    LibraryCollection.save((err, student) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error @Library_Department",
        });
      }
    });
  });
});

module.exports = router;
