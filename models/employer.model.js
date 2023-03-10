const mongoose=require('mongoose');
const Job=require('../models/job.model');
const User=require('../models/user.model');

const employerSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    listings:{
        type:[mongoose.Schema.Types.objectId],
        required:false
    }
})

employerSchema.statics.addListing=async function(document){
    const employerId=document.author;
    await this.findOneAndUpdate(
        {_id:employerId},
        {_id:employerId},
        { upsert: true, new: true }    
    )

    const jobId=document._id;
    await this.updateOne({_id:employerId},{$push:{listings:jobId}})
}

employerSchema.statics.deleteListing=async function(employerId,jobId){
    await this.updateOne(
        {_id:employerId},
        {$pull:{listings:jobId}}
    )
}

employerSchema.statics.getListings=async function(employerId){
    let employer;
    employer=await this.findOne({_id:employerId});
    // console.log(employer);
    let listings;
    if(employer) listings=employer.listings;
    else return null;
    // console.log(listings);
    let jobNumber=1;
    let jobListings=[];
    for(const listing of listings){
        const job=await Job.fetchJobById(listing);
        jobListings.push({
            jobNumber: jobNumber++,
            jobTitle:job.jobTitle,
            salary:job.salary,
            jobId: job._id.toString()
        })
    }
    return jobListings;
}

// employerSchema.statics.getCandidates=async function(jobId){
//     let candidateIds=await Job.getCandidatesByJobId(jobId);
    
//     let candidates=[];
//     for(const candidateId of candidateIds){
//         const user=await User.getUserById(candidateId);
//         candidates.push
//     }
//     console.log(job);
//     return job;
// }

const Employer=mongoose.model('employer',employerSchema);

module.exports=Employer;