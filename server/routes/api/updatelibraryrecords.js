const express = require("express");
const router = express.Router();

const Library = require("../../models/LibraryDepartment");

router.patch("/", (req, res) => {
  const { body } = req;
  const { regNo, bookLost, amountPaid, amountRequiredForLostItem, balance } =
    body;

  Library.updateOne(
    { regNo },
    {
      $set: {
        bookLost,
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
        message: "@LibrayDepartment Successfully updated.",
      });
    }
  );
});

module.exports = router;
