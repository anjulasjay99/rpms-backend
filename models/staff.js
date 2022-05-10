const mongoose = require("mongoose")

const Schema = mongoose.Schema

const staffSchema = new Schema({
    fullName : {type:String, required:true},
    Sliitemail : {type:String, required:true},
    staffId  :{type:String, required:true},
    mobileNo : {type:String, required:true},
    field : {type:String, required:true},
    password : {type:String, required:true},
    role : {type:String, required:true},
    
})

const Staff = mongoose.model("staff",staffSchema);

module.exports = Staff;