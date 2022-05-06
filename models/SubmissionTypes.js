const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  isFileUpload: { type: Boolean, required: true },
  isEditable: { type: Boolean, required: true },
  isMultipleSubmissions: { type: Boolean, required: true },
  visibility: { type: String, required: true },
  totalSubmissions: { type: Number, required: true },
  createdBy: { type: String, required: true },
  dateCreated: { type: Date, required: true },
});

const SubmissionType = mongoose.model("submissionType", submissionTypeSchema);

module.exports = SubmissionType;
