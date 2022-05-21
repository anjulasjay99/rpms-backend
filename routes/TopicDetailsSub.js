const router = require("express").Router();
const fs = require("fs");
const path = require("path");
let TopicDetailsSub = require("../models/TopicDetailsSubmission");

const templateDir = ("./uploads/documents/");

//Submission of Topic Details to panel

router.route("/add").post((req,res) =>{

    const isAccepted = 0;
    const {groupId , document} = req.body;

    const newTopicSubmission = new TopicDetailsSub({
        groupId,
        document,
        isAccepted
    });

    newTopicSubmission.save().then(() =>{
        res.json("Topic Details submitted!");
    }).catch((err) =>{
        console.log(err);

    });
});


// Topic Document Upload

router.route("/files/upload").post((req,res) =>{
    let document = req.files.document;
    const docName = Date.now().toString() + "-" + document.name;
    const docPath = templateDir + docName;
    document.mv(docPath);
    res.status(200).json(docName);

});

module.exports = router;

