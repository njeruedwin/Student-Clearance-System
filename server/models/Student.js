const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//set up the user schema
const StudentSchema = new mongoose.Schema({
  regNo: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  course: {
    type: String,
    default: "",
    required: true,
  },
  cleared: {
    type: Boolean,
    default: false,
  },
});

//set up methods for the user schema
//generate hash
StudentSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//compare the passwords
StudentSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Student", StudentSchema);
