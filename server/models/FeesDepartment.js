const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Number } = require("mongoose");

//set up the user schema
const FeesSchema = new mongoose.Schema({
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
  feesRequired: {
    type: Number,
    default: 0,
  },
  feesPaid: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Fees_Department", FeesSchema);
