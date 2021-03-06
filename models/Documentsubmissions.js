const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentsSubmissionSchema = new Schema({
  GroupId: { type: String, required: true },
  submissionType: { type: String, required: true },
  document: { type: String, required: true },
  submissionDate: { type: String, required: true },
  marks: { type: Number, required: true },
  status: {type : String},
  feedback: {type : String},
  docfileId: { type: String, required: false }
  
});

const DocumentSubmission = mongoose.model("documentsSubmission", documentsSubmissionSchema);

module.exports = DocumentSubmission;