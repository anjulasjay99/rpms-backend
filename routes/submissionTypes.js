const router = require("express").Router();
let SubmissionType = require("../models/SubmissionTypes");
let jwt = require("jsonwebtoken");

//check if user is authorized
const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//fetch all available submission types
router.route("/").get((req, res) => {
  SubmissionType.find()
    .then((submissionTypes) => {
      res.status(200).json(submissionTypes);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

//add a new submission type
router.route("/:username").post((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const username = req.params.username;

    const {
      name,
      description,
      templateId,
      isEditable,
      isMultipleSubmissions,
      visibility,
    } = req.body;

    const dateCreated = new Date().toUTCString();

    const newSubmissionType = new SubmissionType({
      name,
      description,
      templateId,
      isEditable,
      isMultipleSubmissions,
      visibility,
      createdBy: username,
      dateCreated,
      totalSubmissions: 0,
    });

    newSubmissionType
      .save()
      .then(() => {
        res.status(200).json("Submission Type Added");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//delete submission type
router.route("/:id").delete((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const id = req.params.id;
    SubmissionType.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json("Deleted!");
      })
      .catch((err) => {
        res.status(400).json(err);
        console.error(err);
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

module.exports = router;
