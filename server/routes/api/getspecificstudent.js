const express = require("express");
const router = express.Router();

const Student = require("../../models/Student");

router.get("/", (req, res) => {
  const { query } = req;
  const { regNo } = query;

  Student.find({ regNo }, (err, student) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (student == 0) {
      return res.send({
        success: false,
        message: "Student does not exist",
      });
    }

    res.send(student);
  });
});

module.exports = router;
