const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const adminSignInRoute = require("./routes/api/adminsignin");
const createAdminRoute = require("./routes/api/createadmin");
const verifyAdminRoute = require("./routes/api/verifyadmin");
const verifyStudentRoute = require("./routes/api/verifystudent");
const adminLogOutRoute = require("./routes/api/adminlogout");
const studentLogOutRoute = require("./routes/api/studentlogout");
const createStudentRoute = require("./routes/api/createstudent");
const updateLibraryRecordsRoute = require("./routes/api/updatelibraryrecords");
const updateGamesRecordsRoute = require("./routes/api/updategamesrecords");
const updateFeesRecordsRoute = require("./routes/api/updatefeesrecords");
const clearStudentRoute = require("./routes/api/clearstudent");
const getStudentsRoute = require("./routes/api/getstudents");
const getFeesRecordsRoute = require("./routes/api/getfeesrecords");
const getLibraryRecordsRoute = require("./routes/api/getlibraryrecords");
const getGamesRecordsRoute = require("./routes/api/getgamesrecords");
const getClearedStudentsRoute = require("./routes/api/getclearedstudents");
const studentSignInRoute = require("./routes/api/studentsignin");
const getSpecificStudentRoute = require("./routes/api/getspecificstudent");
const getSpecificLibraryRecord = require("./routes/api/getspecificlibraryrecord");
const getSpecificGamesRecord = require("./routes/api/getspecificgamesrecord");
const getSpecificFeesRecord = require("./routes/api/getspecificfeesrecord");
const { verify } = require("jsonwebtoken");

//set routes
app.use("/api/admin/adminsignin", adminSignInRoute);
app.use("/api/admin/createadmin", createAdminRoute);
app.use("/api/admin/adminlogout", adminLogOutRoute);
app.use("/api/student/studentlogout", studentLogOutRoute);
app.use("/api/admin/verifyadmin", verifyAdminRoute);
app.use("/api/admin/verifystudent", verifyStudentRoute);
app.use("/api/admin/createstudent", createStudentRoute);
app.use("/api/admin/updatelibraryrecords", updateLibraryRecordsRoute);
app.use("/api/admin/updategamesrecords", updateGamesRecordsRoute);
app.use("/api/admin/updatefeesrecords", updateFeesRecordsRoute);
app.use("/api/admin/clearstudent", clearStudentRoute);
app.use("/api/admin/getstudents", getStudentsRoute);
app.use("/api/admin/getfeesrecords", getFeesRecordsRoute);
app.use("/api/admin/getlibraryrecords", getLibraryRecordsRoute);
app.use("/api/admin/getgamesrecords", getGamesRecordsRoute);
app.use("/api/admin/getclearedstudents", getClearedStudentsRoute);
app.use("/api/admin/studentsignin", studentSignInRoute);
app.use("/api/admin/getspecificstudent", getSpecificStudentRoute);
app.use("/api/admin/getspecificlibraryrecord", getSpecificLibraryRecord);
app.use("/api/admin/getspecificgamesrecord", getSpecificGamesRecord);
app.use("/api/admin/getspecificfeesrecord", getSpecificFeesRecord);
//connect to the database
mongoose.connect(
  "mongodb://localhost/studentclearance",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successfuly conneted to mongoDB");
  }
);

//listen to port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
