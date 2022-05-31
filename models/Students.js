const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  IdNumber: { type: String },
  email: { type: String },
  nic: { type: String },
  password : {type : String},
  telNo: { type: String, required: true },
  isGrouped: { type: Boolean },
  role: { type: String, required: true },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
