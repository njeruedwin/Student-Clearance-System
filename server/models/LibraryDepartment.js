const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//set up the user schema
const LibrarySchema = new mongoose.Schema({
  regNo: {
    type: String,
    default: "",
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  bookLost: {
    type: String,
    default: "",
  },
  amountRequiredForLostItem: {
    type: Number,
    default: 0,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Library_Department", LibrarySchema);
