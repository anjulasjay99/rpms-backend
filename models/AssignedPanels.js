const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignedPanelScheme = new Schema({
  groupId: { type: String, required: true },
  panel: { type: String, required: true },
  dateAssigned: { type: String, required: true },
});

const AssignedPanel = mongoose.model("assignedPanel", assignedPanelScheme);

module.exports = AssignedPanel;
