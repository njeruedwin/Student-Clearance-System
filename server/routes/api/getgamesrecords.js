const express = require("express");
const router = express.Router();

const Games = require("../../models/GamesDepartment");

router.get("/", (req, res) => {
  Games.find({}, (err, gamesrecords) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(gamesrecords);
  });
});

module.exports = router;
