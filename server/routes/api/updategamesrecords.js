const express = require("express");
const router = express.Router();

const Games = require("../../models/GamesDepartment");

router.patch("/", (req, res) => {
  const { body } = req;
  const { regNo, itemLost, amountPaid, amountRequiredForLostItem, balance } =
    body;

  Games.updateOne(
    { regNo },
    {
      $set: {
        itemLost,
        amountPaid,
        amountRequiredForLostItem,
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
        message: "@GamesDepartment Successfully updated.",
      });
    }
  );
});

module.exports = router;
