const express = require("express");
const router = express.Router();

const Library = require("../../models/LibraryDepartment");

router.get("/", (req, res) => {
  Library.find({}, (err, libraryrecords) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(libraryrecords);
  });
});

module.exports = router;
