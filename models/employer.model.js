const mongoose=require('mongoose');

const employerSchema=new mongoose.Schema({
    listings:{
        type:[mongoose.Schema.objectId]
    }
},{_id:false})

const Employer=mongoose.model('employer',employerSchema);

module.exports=Employer;