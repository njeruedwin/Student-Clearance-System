const express = require("express");
const router = express.Router();

//import the models
const Admin = require("../../models/Admin");
const AdminSession = require("../../models/AdminSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { adminId, password, role } = body;

  //make sure they are not blank
  if (!adminId) {
    return res.send({
      success: false,
      message: "admin id field should not be empty",
    });
  }
  if (!role) {
    return res.send({
      success: false,
      message: "role field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
  Admin.find({ adminId }, (err, admins) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    if (admins == 0) {
      return res.send({
        success: false,
        message: "The Admin does not exist",
      });
    }

    //user does exist
    //check if password is correct for that particular admin
    const admin = admins[0];
    //check if the role matches
    if (role != admin.role) {
      return res.send({
        success: false,
        message: "The Role is not for the userId",
      });
    }
    if (!admin.validPassword(password)) {
      return res.send({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Everything is OK
    //create an Admin session

    const newAdminSession = new AdminSession({
      adminId: admin.id,
    });

    //save the new user session

    newAdminSession.save((err, session) => {
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
