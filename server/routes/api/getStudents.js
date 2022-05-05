const express = require("express");
const router = express.Router();

const Student = require("../../models/Student");

router.get("/", (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(students);
  });
});

module.exports = router;
