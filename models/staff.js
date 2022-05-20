const mongoose = require("mongoose")

const Schema = mongoose.Schema

const staffSchema = new Schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    sliitEmail : {type:String, required:true},
    staffId  :{type:String, required:true},
    telNo : {type:String, required:true},
    field : {type:String, required:true},
    password : {type:String, required:true},
})

const Staff = mongoose.model("staff",staffSchema);

module.exports = Staff;