function getAllJobs(req,res){
    res.render('jobs/all-jobs');
}

function getJobDetails(req,res){
    res.render('jobs/job-details');
}

function getPostJob(req,res){
    res.render('jobs/post-job');
}
module.exports={
    getAllJobs:getAllJobs,
    getJobDetails:getJobDetails,
    getPostJob:getPostJob
}