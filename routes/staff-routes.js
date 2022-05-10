const staffRouter = require("express").Router();

const model = require("../models/staff");


//register staff
staffRouter.route("/save").post((req,res)=>{
    let staff = new model(req.body);
    staff.save().then(staff =>{
        res.status(200).json({'staff':'A new Staff added'}) 
    }).
    catch((err)=>{
        res.status(400).send("Staff member not added")
        console.log(err)
    })

})

module.exports = staffRouter;