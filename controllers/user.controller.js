const { ObjectId } = require('mongodb');
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

function getAppliedJobs(req,res){
    res.render('user/applied-jobs');
}

module.exports={
    getUser:getUser,
    updateUser:updateUser,
    getAppliedJobs:getAppliedJobs
}