const { ObjectId } = require('mongodb');
const Job = require('../models/job.model');
const User=require('../models/user.model');


async function getUser(req,res){
    if(req.session.uid){
        const userId=new ObjectId(req.session.uid);
        const user=await User.getUserById(userId);
        console.log(user);
        return res.render('user/profile',{user:user})
    }else return res.render('shared/401');
}

async function updateUser(req,res){
    const userId=new ObjectId(req.session.uid);
    const user=await User.getUserById(userId);
    let updatedUser={
        ...user,
        name:req.body.fullname
    }
    if(req.file) updatedUser={...updatedUser,resume:req.file.filename}

    console.log(updatedUser);

    await User.updateUserById(userId,updatedUser);

    res.redirect('/profile');
}

async function getAppliedJobs(req,res){
    const userId=new ObjectId(req.session.uid);

    const appliedJobs=await User.getAppliedJobs(userId);
    let appliedJobsWithDetails=[];
    // console.log(appliedJobs);
    for(const appliedJob of appliedJobs){
        let job=await Job.fetchJobForAppliedJobsPage(appliedJob.jobId);

        job={...job.toObject(),
            dateApplied:appliedJob.applicationTime.toLocaleString('en-CA',{dateStyle:'medium'})};

        // console.log(job);
        appliedJobsWithDetails.push(job);
    }
    // console.log(appliedJobsWithDetails);
    res.render('user/applied-jobs',{appliedJobs:appliedJobsWithDetails});
}

module.exports={
    getUser:getUser,
    updateUser:updateUser,
    getAppliedJobs:getAppliedJobs
}