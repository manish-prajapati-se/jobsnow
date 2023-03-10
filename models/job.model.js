const mongoose=require('mongoose');
const validator=require('validator');
const db=require('../data/database');
const moment=require('moment');
const sliceText=require('../utils/stringUtils');
const { ObjectId } = require('mongodb');
const User=require('../models/user.model');

const jobSchema=new mongoose.Schema({
    jobTitle: {
        type: String,
        required : [true, 'Please enter Job title']
      },
    companyName: {
        type: String,
        required: [true,'Please add company name']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        validate:{
            validator:(email)=>validator.isEmail(email),
            message:'Enter a valid email address'
        }
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    salary:{
        type: Number,
        required:[true,'Please enter expected salary for this job'],
        min:[1,'Please enter a valid salary']
    },
    positions:{
        type: Number,
        required:[true,'Please enter number of positions'],
        min:[1,'Please enter a valid number of positions']
    },
    jobDescription:{
        type: String,
        required:[true,'Please add a job description'],
        maxlength:[2000,'Job description cannot exceed 2000 characters']
    },
    jobType:{
        type:String,
        required:[true,'Please select job type'],
        enum:{
            values:[
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message:'Please select correct option for job type'
        }
    },
    minEducation:{
        type:String,
        required:[true,'Please select education needed'],
        enum:{
            values:[
                'Bachelors',
                'Masters',
                'PhD'
            ],
            message:'Please select correct option for education'
        }
    },
    industry:{
        type:String,
        required:[true,'Please select industry for this job'],
        enum:{
            values:[
                'Business',
                'Information Technology',
                'Banking',
                'Education',
                'Telecommunication',
                'Other'
            ],
            message:'Please select correct option for industry'
        }
    },
    experience:{
        type:String,
        required:[true,'Please select experience required'],
        enum:{
            values:[
                'No experience',
                '1-2 years',
                '2-5 years',
                'More than 5 years'
            ],
            message:'Please select correct option for experience'
        }
    },
    applicants:{
        type:[Object],
        select:false
    },
    author:{
        type:mongoose.Schema.ObjectId,
        required: true
    },
    postingDate:{
        type:Date,
        default: Date.now
    },
    lastDate:{
        type:Date,
        default: new Date().setDate(new Date().getDate()+7)
    }

})

jobSchema.statics.fetchAllJobs=async function(){
    // const jobs=await db.getDb().collection('jobs').find().toArray();
    const jobs=await this.find();
 
    for(let i=0;i<jobs.length;i++){
        const date=moment(jobs[i].postingDate);
        const timeFromNow=date.fromNow();
        // console.log(timeFromNow);



        jobs[i]={...jobs[i].toObject(),
            timeFromNow:timeFromNow,
            jobDescription:sliceText(jobs[i].jobDescription)
        }
    }

    return jobs;
}

jobSchema.statics.fetchJobById=async function(jobId){
    const mongoJobId=new ObjectId(jobId);
    let job;
    try{
        job=await this.findOne({_id:mongoJobId}).select('+applicants');
    }catch(err){
        console.log(err);
    }
    const date=moment(job.postingDate);
    const timeFromNow=date.fromNow();
    
    const lastDate=job.lastDate;
    const localizedLastDate=lastDate.toLocaleString('en-US',{
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    });

    job={...job.toObject(),
        timeFromNow:timeFromNow,
        localizedLastDate:localizedLastDate,
        numberOfApplicants:job.applicants.length
    }

    return job;
}

jobSchema.statics.applyToJob=async function(jobId,userId){
    try{
        const resume=await User.getResume(userId);
        console.log(resume);
        const applicant={
            userId: userId,
            resume: resume
        }
        console.log(applicant);
        await this.findOneAndUpdate({_id:jobId},{$addToSet:{applicants:applicant}});
    }catch(error){
        console.log(error);
    }
}

jobSchema.statics.fetchJobForAppliedJobsPage=async function(jobId){
    const job=await this.findOne({_id:jobId},{_id:1,jobTitle:1,companyName:1,salary:1});
    return job;
}

jobSchema.statics.withdrawJob=async function(jobId,userId){
    try{
        await this.updateOne({_id:jobId},{$pull:{applicants:{userId: userId}}});
    }catch(error){
        console.log(error);
    }
}

jobSchema.statics.getCandidatesByJobId=async function(jobId){
    let job;
    try{
        job=await this.findOne({_id:jobId},{applicants:1});
        return job.applicants;
    }catch(error){
        console.log(error);
    }
}

jobSchema.statics.getJobTitle=async function(jobId){
    let job;
    try{
        job=await this.findOne({_id:jobId},{jobTitle:1});
        return job.jobTitle;
    }catch(error){
        console.log(error);
    }
}

const Job=mongoose.model('jobs',jobSchema);

module.exports=Job;