const express = require("express");
const router = express.Router();

const Fees = require("../../models/FeesDepartment");

router.get("/", (req, res) => {
  Fees.find({}, (err, feesrecords) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(feesrecords);
  });
});

module.exports = router;
