const express = require("express");
const router = express.Router();

//import the model
const Admin = require("../../models/Admin");

router.post("/", (req, res) => {
  let { body } = req;
  let { adminId, password, role } = body;

  //make sure the fields are not null

  if (!adminId) {
    res.send({
      success: false,
      message: "username Field is empty",
    });
  }
  if (!password) {
    res.send({
      success: false,
      message: "username Field is empty",
    });
  }
  if (!role) {
    res.send({
      success: false,
      message: "Role Field is empty",
    });
  }

  //make sure that the username does not exist
  Admin.find({ adminId }, (err, admins) => {
    if (err) {
      res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (admins != 0) {
      res.send({
        success: false,
        message: "The admin already exists",
      });
    }

    //the admin is new
    //save the admin
    const newAdmin = new Admin({
      adminId,
      password,
      role,
    });

    //encrypt the password
    newAdmin.password = newAdmin.generateHash(password);

    newAdmin.save((err, admin) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "New Admin " + role + " Registered",
      });
    });
  });
});

module.exports = router;
