const router = require("express").Router();

const templateDir = "./uploads/templates/";
const markingSchemesDir = "./uploads/marking_schemes/";

//upload a new template
router.route("/templates").post((req, res) => {
  if (req.files) {
    let document = req.files.template;
    const docName = Date.now().toString() + "-" + document.name;
    const docPath = templateDir + docName;
    document.mv(docPath);
    res.json(docName);
  } else {
    res.json("No file was uploaded!");
  }
});

//upload a new marking scheme
router.route("/markingschemes").post((req, res) => {
  if (req.files) {
    let document = req.files.markingscheme;
    const docName = Date.now().toString() + "-" + document.name;
    const docPath = markingSchemesDir + docName;
    document.mv(docPath);
    res.json(docName);
  } else {
    res.json("No file was uploaded!");
  }
});

module.exports = router;
