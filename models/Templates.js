const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateScheme = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  document: { type: String, required: true },
  visibility: { type: String, required: true },
  createdBy: { type: String, required: true },
  dateCreated: { type: Date, required: true },
});

const Template = mongoose.model("template", templateScheme);

module.exports = Template;
