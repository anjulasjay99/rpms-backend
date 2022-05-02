const router = require("express").Router();
let Template = require("../models/Templates");

const templateDir = "./uploads/templates/";

//fetch all available templates
router.route("/").get((req, res) => {
  Template.find()
    .then((templates) => {
      res.json(templates);
    })
    .catch((err) => {
      console.log(err);
    });
});

//add a new template
router.route("/:username").post((req, res) => {
  const username = req.params.username;

  const { name, description, document, visibility } = req.body;

  const dateCreated = new Date();

  const newTemplate = new Template({
    name,
    description,
    document,
    visibility,
    createdBy: username,
    dateCreated,
  });

  newTemplate
    .save()
    .then(() => {
      res.json("Template Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
