const express = require("express");
const router = express.Router();

const Student = require("../../models/Student");

router.patch("/", (req, res) => {
  const { body } = req;
  const { regNo, cleared } = body;

  Student.updateOne(
    { regNo },
    {
      $set: {
        cleared,
      },
    },
    (err, car) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message:
          "@StudentDepartment Successfully updated: Student Successfully Cleared.",
      });
    }
  );
});

module.exports = router;
