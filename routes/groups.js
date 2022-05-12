const router = require("express").Router();

let Group = require("../models/Groups");

//Group Registration

router.route("/add").post((req, res) => {
  //Getting Maximum ID
  var MaxID = Group.find()
    .sort({ groupID: -1 })
    .limit(1)
    .toArray()
    .map(function (u) {
      return u.groupID;
    });
  const {
    LeaderID,
    LeaderNIC,
    Leadermail,
    Leadercontact,
    S2ID,
    S2NIC,
    S2mail,
    S2contact,
    S3ID,
    S3NIC,
    S3mail,
    S3contact,
    S4ID,
    S4NIC,
    S4mail,
    S4contact,
  } = req.body;

  let groupID = "RSH_GRP" + MaxID + 1;
  const Panel = "Unassigned";

  //Adding Group Details to the Database

  const newGroup = new Group({
    groupID,
    LeaderID,
    LeaderNIC,
    Leadermail,
    Leadercontact,
    S2ID,
    S2NIC,
    S2mail,
    S2contact,
    S3ID,
    S3NIC,
    S3mail,
    S3contact,
    S4ID,
    S4NIC,
    S4mail,
    S4contact,
    Panel,
  });

  newGroup
    .save()
    .then(() => {
      res.json("Group Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all registered groups
router.route("/").get((req, res) => {
  Group.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//assign panel to research group
router.route("/panels/:id").put((req, res) => {
  const id = req.params.id;
  const { panel } = req.body;

  Group.findByIdAndUpdate(id, { Panel: panel })
    .then(() => {
      res.status(200).json("Assigned Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error");
    });
});

module.exports = router;
