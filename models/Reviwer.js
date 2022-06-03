const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reviewerSchema = new Schema({
    GroupId : {type:String, required:true},
    Description : {type:String, required:true},
})

const Reviewer = mongoose.model("reviewer",reviewerSchema);

module.exports = Reviewer;