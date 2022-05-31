const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
  GroupId: { type: String, required: true },
  submission: { type: String, required: true },
  marks: { type: String, required: true },
});

const Evaluation = mongoose.model("documentevaluation", evaluationSchema);

module.exports = Evaluation;