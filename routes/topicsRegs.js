const router = require("express").Router();

let TopicReg = require("../models/ResearchTopicReg");


//Registration of new topic with Supervisor

router.route("/add/:id").post((req,res) =>{
    
    var groupId = req.params.id;
    var isApproved = 0;
    const {field , topic  , supervisorId} = req.body;

    const newTopicReg = new TopicReg({
        groupId , 
        field ,
        topic ,
        supervisorId,
        isApproved
    })

    newTopicReg.save().then(()=>{
        res.json("Topic submitted for revision!");
    }).catch((err) =>{
        console.log(err);
    })
})


//Get all topic submissions 

router.route("/").get((req,res) =>{
    TopicReg.find().then((submissions) =>{
        res.json(submissions);
    }).catch((err) =>{
        console.log(err);
    })
})


// Get all topics by group ID 

router.route("/getByStudent/:id").get((req,res) =>{
    const grpID = req.params.id;
    TopicReg.find({groupId : grpID }).then((topics) =>{
        res.json(topics);
    }).catch((err) =>{
        console.log(err);
    })
})


// Request CoSupervisor 

router.route("/:id").get((req,res) =>{
    const grpID = req.params.id;
    const {coSupervisorID} = req.body;

    TopicReg.updateOne(
        {groupId : grpID},
        {
            $set : {
                cosupervisorId : coSupervisorID
            }
        }
    )
    

})

module.exports = router;