const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginActivitySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dateAndTime: { type: String, required: true },
});

const LoginActivity = mongoose.model("loginActivities", loginActivitySchema);

module.exports = LoginActivity;
