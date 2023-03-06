const Job=require('../models/job.model');


async function getAllJobs(req,res){
    const jobs=await Job.fetchAllJobs();
    console.log(jobs);
    res.render('jobs/all-jobs',{jobs:jobs});
}

async function getJobDetails(req,res){
    const jobId=req.params.id;
    try{
        const job=await Job.fetchJobById(jobId)
        console.log(job);
        res.render('jobs/job-details',{job:job});
    }catch(error){
        console.log(error);
        res.render('shared/404');
    }

}


module.exports={
    getAllJobs:getAllJobs,
    getJobDetails:getJobDetails
}