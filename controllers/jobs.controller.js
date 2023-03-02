function getAllJobs(req,res){
    res.render('jobs/all-jobs');
}

function getJobDetails(req,res){
    res.render('jobs/job-details');
}

module.exports={
    getAllJobs:getAllJobs,
    getJobDetails:getJobDetails
}