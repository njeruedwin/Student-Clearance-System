const express = require("express");
const router = express.Router();

const Fees = require("../../models/FeesDepartment");

router.patch("/", (req, res) => {
  const { body } = req;
  const { regNo, feesRequired, feesPaid, balance } = body;

  Fees.updateOne(
    { regNo },
    {
      $set: {
        feesRequired,
        feesPaid,
        balance,
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
        message: "@FeesDepartment Successfully updated.",
      });
    }
  );
});

module.exports = router;
