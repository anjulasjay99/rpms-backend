const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nic: { type: String, required: true },
  telNo: { type: String, required: true },
  role: { type: String, required: true },
  dateCreated: { type: String, required: true },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
