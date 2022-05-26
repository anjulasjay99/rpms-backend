const router = require("express").Router();

let Submission = require("../models/Documentsubmissions");

const documentDir = ("./uploads/documents/");

// Submission Details 

router.route("/add").post((req,res) =>{
    const p_marks = 0;
    const p_date = new Date();


    const {GroupId , submissionType , document } = req.body;

    const newSubmission = new Submission({
        GroupId,
        submissionType,
        document,
        submissionDate : p_date,
        marks : p_marks

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
