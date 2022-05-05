const express = require("express");
const router = express.Router();
//Import the User and UserSession schema
const Student = require("../../models/Student");
const StudentSession = require("../../models/StudentSession");
/*
 *Log Out
 */
router.get("/", (req, res) => {
  //destructore to get token
  //req.query.token
  const { query } = req;
  const { token } = query;

  StudentSession.findOneAndUpdate(
    {
      _id: token,
      isValid: true,
    },
    {
      $set: { isValid: false },
    },

    (err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }
      if (session == null) {
        return res.send({
          success: false,
          message: "Session does not exist",
        });
      }

      res.send({
        success: true,
        message: "Logged Out",
      });
    }
  );
});
module.exports = router;
