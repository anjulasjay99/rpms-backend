const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  InitName: { type: String, required: true },
  IdNumber: { type: String, required: true },
  email: { type: String, required: true },
  nic: { type: String, required: true },
  telNo: { type: String, required: true },
  isGrouped: { type: Boolean, required: true },
  role: { type: String, required: true },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
