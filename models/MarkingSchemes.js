const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markingSchemeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  document: { type: String, required: false },
  visibility: { type: String, required: true },
  criterias: { type: [{ criteria: String, mark: Number }], required: true },
  createdBy: { type: String, required: true },
  dateCreated: { type: Date, required: true },
});

const MarkingScheme = mongoose.model("markingScheme", markingSchemeSchema);

module.exports = MarkingScheme;
