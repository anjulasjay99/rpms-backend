const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: { type: String, required: true },
  permissionLevel: { type: String, required: true },
  totalUsers: { type: Number, required: true },
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
