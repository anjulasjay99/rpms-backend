const fs = require("fs");
const path = require("path");
const router = require("express").Router();

let Submission = require("../models/Documentsubmissions");

const documentDir = ("./uploads/documents/");

// Submission Details 

router.route("/add").post((req,res) =>{
    const p_marks = 0;
    const p_date = new Date();


    const {GroupId , submissionType , document,  docfileId } = req.body;
    console.log(docfileId)
    console.log(document);
    const newSubmission = new Submission({
        GroupId,
        submissionType,
        document,
        docfileId,
        submissionDate : p_date,
        marks : p_marks,
    

    });

    newSubmission.save().then(() =>{
        res.json("Submission successfull !").status(200);
    }).catch((err) =>{
        console.log(err);
        res.json("Submission Failed !");
        res.status(400);
    });


});

// Upload Document

router.route("/submitDoc").post((req,res) =>{
    if(req.files){
        let document = req.files.document;
        const fileId = Date.now().toString();
        const docName = fileId +"-"+ document.name;
        const docPath = documentDir + docName;
        document.mv(docPath);
        res.status(200).json({ document: document.name, fileId: fileId });        
    }
    else{
        res.json("File not uploaded !");
    }
})

//get submission by type
router.route("/get/:submissionType").get(async(req,res)=>{
    let submissionType = req.params.submissionType;
    await Submission.find({submissionType}).then((submissions)=>{
        res.json(submissions);
    })
    .catch((err)=>{
        console.log(err)
    })
})

//get submission by Id
router.route("/getsubmission/:id").get(async(req,res) =>{
    const id = req.params.id;
    console.log(id);
    await Submission.findById(id).then((submissions)=>{
      res.json(submissions);
      console.log(submissions)
    }).catch((err) =>{
      console.log(err);
    })
  })
  

//download document
router.route("/files/download/:id").get((req, res) => {
    const id = req.params.id;
    console.log(id)
    let documents = fs.readdirSync(documentDir);
    let file = "";
  
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].split("-")[0] === id) {
        file = documents[i];
        break;
      }
    }
  
    if (file !== "") {
      res.sendFile(path.join(__dirname, "../uploads/documents/", file));
    } else {
      res.sendStatus(400);
    }
  });

  //update the documents
  router.route("/update/:id").put(function (req, res) {
    Submission.findById(req.params.id, function (err, Submission) {
        if (!Submission) res.status(404).send("id not found");
        else 
        Submission.GroupId = req.body.GroupId;
        Submission.submissionType = req.body.submissionType;
        Submission.document = req.body.doc;
        Submission.submissionDate = req.body.submissionDate;
        Submission.marks = req.body.marks;
        Submission
          .save()
          .then((Submission) => {
              console.log(Submission)
            res.json("Suceessfully updated!");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
            console.log(err)
          });
      });
    });

    // Get Submission by Group Id

    router.route("/getsubmissionByGroup/:id").get(async(req,res) =>{
      const id = req.params.id;
      console.log(id);
      await Submission.find({GroupId : id}).then((submissions)=>{
        res.json(submissions);
        console.log(submissions)
      }).catch((err) =>{
        console.log(err);
      })
    })

    // Get All Submissions

    router.route("/").get(async(req,res) =>{
      Submission.find().then((data) =>{
        res.json(data).status(200);
      }).catch((err) =>{
        console.log(err);
      })
    })


module.exports = router;
