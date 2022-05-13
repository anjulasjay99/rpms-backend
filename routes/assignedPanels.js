const router = require("express").Router();
let AssignedPanel = require("../models/AssignedPanels");

//fetch all assigned panels
router.route("/").get((req, res) => {
  AssignedPanel.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//assign a panel to a group
router.route("/").post(async (req, res) => {
  const { groupId, panel } = req.body;
  const dateAssigned = new Date();

  const newPanel = new AssignedPanel({
    groupId,
    panel,
    dateAssigned,
  });

  await newPanel
    .save()
    .then(() => {
      res.status(200).json("Assigned Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

module.exports = router;
