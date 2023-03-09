const { ObjectId } = require('mongodb');
const Job=require('../models/job.model');
const User=require('../models/user.model');

async function getAllJobs(req,res){
    const jobs=await Job.fetchAllJobs();
    // console.log(jobs);
    res.render('jobs/all-jobs',{jobs:jobs});
}

async function getJobDetails(req,res){
    const jobId=req.params.id;
    try{
        const job=await Job.fetchJobById(jobId)
        let hasApplied=false;

        if(req.session.uid){
            const userId=new ObjectId(req.session.uid)
        // const jobId=new ObjectId(jobId);
            const user=await User.getUserById(userId);

             for(const appliedJob of user.appliedJobs){
                if(appliedJob.jobId.toString()==jobId){
                    hasApplied=true;
                }
            }

        }
        // console.log(job);
        res.render('jobs/job-details',{job:job,hasApplied:hasApplied});
    }catch(error){
        console.log(error);
        res.render('shared/404');
    }

}

async function applyToJob(req,res){
    const jobId=new ObjectId(req.params.id);
    const userId=new ObjectId(req.session.uid);

    await Job.applyToJob(jobId,userId);
    await User.addAppliedJob(userId,jobId);
    
    res.redirect(`/jobs/${req.params.id}`);
}

async function withdrawJob(req,res){
    const jobId=new ObjectId(req.params.id);
    const userId=new ObjectId(req.session.uid);

    await Job.withdrawJob(jobId,userId);
    await User.removeAppliedJob(userId,jobId);


    res.redirect('/applied-jobs');
}


module.exports={
    getAllJobs:getAllJobs,
    getJobDetails:getJobDetails,
    applyToJob:applyToJob,
    withdrawJob:withdrawJob
}