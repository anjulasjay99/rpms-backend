const router = require("express").Router();
let SubmissionType = require("../models/SubmissionTypes");

//fetch all available submission types
router.route("/").get((req, res) => {
  SubmissionType.find()
    .then((submissionTypes) => {
      res.json(submissionTypes);
    })
    .catch((err) => {
      console.log(err);
    });
});

//add a new submission type
router.route("/:username").post((req, res) => {
  const username = req.params.username;

  const {
    name,
    description,
    isFileUpload,
    isEditable,
    isMultipleSubmissions,
    visibility,
  } = req.body;

  const dateCreated = new Date();

  const newSubmissionType = new SubmissionType({
    name,
    description,
    isFileUpload,
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
      res.json("Submission Type Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
