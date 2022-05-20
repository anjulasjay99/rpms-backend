const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupID: { type: String, required: true },
  LeaderID: { type: String, required: true },
  LeaderNIC: { type: String, required: true },
  Leadermail: { type: String, required: true },
  Leadercontact: { type: String, required: true },

  S2ID: { type: String, required: true },
  S2NIC: { type: String, required: true },
  S2mail: { type: String, required: true },
  S2contact: { type: String, required: true },

  S3ID: { type: String, required: true },
  S3NIC: { type: String, required: true },
  S3mail: { type: String, required: true },
  S3contact: { type: String, required: true },

  S4ID: { type: String, required: true },
  S4NIC: { type: String, required: true },
  S4mail: { type: String, required: true },
  S4contact: { type: String, required: true },
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
