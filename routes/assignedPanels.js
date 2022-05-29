const router = require("express").Router();
let AssignedPanel = require("../models/AssignedPanels");
let jwt = require("jsonwebtoken");

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

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
  const token = req.header("x-access-token");
  if (auth(token)) {
    const { groupId, panel } = req.body;
    const dateAssigned = new Date().toUTCString();

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
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//change the assigned panel
router.route("/").put(async (req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const { groupId, panel } = req.body;

    await AssignedPanel.findOneAndUpdate({ groupId }, { panel })
      .then(() => {
        res.status(200).json("Updated Successfully!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

module.exports = router;
