const mongoose = require("mongoose");

const StudentSessionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    default: "",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("StudentSession", StudentSessionSchema);
