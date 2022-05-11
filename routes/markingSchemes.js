const router = require("express").Router();
let MarkingScheme = require("../models/MarkingSchemes");

//fetch all available marking schemes
router.route("/").get((req, res) => {
  MarkingScheme.find()
    .then((markingSchemes) => {
      res.status(200).json(markingSchemes);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

//add a new marking scheme
router.route("/:username").post((req, res) => {
  const username = req.params.username;

  const { name, description, document, criterias, visibility } = req.body;

  const dateCreated = new Date();

  const newMarkingScheme = new MarkingScheme({
    name,
    description,
    document,
    criterias,
    visibility,
    createdBy: username,
    dateCreated,
  });

  newMarkingScheme
    .save()
    .then(() => {
      res.status(200).json("Marking Scheme Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
