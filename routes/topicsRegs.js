const router = require("express").Router();

let TopicReg = require("../models/ResearchTopicReg");


//Registration of new topic with Supervisor

router.route("/add/:id").post((req,res) =>{
    
    var groupId = req.params.id;
    var isApproved = 0;
    const {field , topic , description , supervisorId} = req.body;

    const newTopicReg = new TopicReg({
        groupId , 
        field ,
        topic ,
        description,
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