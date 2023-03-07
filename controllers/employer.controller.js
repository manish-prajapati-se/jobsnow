const Job=require('../models/job.model');
const Employer=require('../models/employer.model');
const educationMap=require('../data/mappings/education.json')
const experienceMap=require('../data/mappings/experience.json');
const industryMap=require('../data/mappings/industry.json');
const jobTypeMap=require('../data/mappings/jobType.json');
const { ObjectId } = require('mongodb');



async function getDashboard(req,res){
    const employerId=new ObjectId(req.session.uid);
    const listings=await Employer.getListings(employerId);
    // console.log(listings);
    res.render('employer/dashboard',{listings:listings});
}

function getPostJob(req,res){
    let sessionInputData;
    if(!req.session.inputData || req.session.inputData.usedFor!=='post-job'){
        sessionInputData={
            jobTitle:'',
            companyName:'',
            email:'',
            address:'',
            salary:'',
            positions:'',
            jobDescription:'',
            jobTypes:'',
            minEducation:'',
            industry:'',
            experience:''
        }
    }else sessionInputData=req.session.inputData;
    res.render('employer/post-job',{inputData: sessionInputData});
}

function postJob(req,res){
    const job=req.body;
    console.log(job);
    const jobFields=['jobTitle','companyName','email','address','salary','positions','jobDescription','jobType','minEducation','industry','experience']
    const jobData={
        jobTitle:job['job-title'],
        companyName:job['company-name'],
        email:job['email'],
        address:job['address'],
        salary:job['salary'],
        positions:job['number-of-positions'],
        jobDescription:job['job-description'],
        jobType:jobTypeMap[job['job-type']],
        minEducation:educationMap[job['education']],
        industry:industryMap[job['industry']],
        experience:experienceMap[job['experience']],
        author: new ObjectId(req.session.uid)
    }

    const newJob=new Job(jobData)

    newJob.save()
        .then(async (doc)=>{
            console.log('new job saved to database');
            
            await Employer.addListing(doc);

            req.session.inputData=null;
            req.session.save(()=>{
                res.redirect('/jobs');
            })
        })
        .catch((error)=>{
            let sessionInputData={
                usedFor:'post-job',
                hasError:true
            }
            for(const jobField of jobFields){
                const err=error.errors[jobField];
                if(err){
                    sessionInputData.errorStatus={
                        ...sessionInputData.errorStatus,
                        [jobField]:err.message
                    }
                }
                sessionInputData={
                    ...sessionInputData,
                    [jobField]:jobData[jobField]
                }
                
            }
            req.session.inputData=sessionInputData;
            req.session.save(()=>{
                return res.redirect('/employer/post-job');
            })
            return;
        })
}


async function deleteJob(req,res){
    const jobId=new ObjectId(req.params.id);
    await Job.deleteOne({_id:jobId});
    const employerId=new ObjectId(req.session.uid);
    await Employer.deleteListing(employerId,jobId);

    res.redirect('/employer/dashboard');
}


module.exports={
    getDashboard:getDashboard,
    getPostJob:getPostJob,
    postJob:postJob,
    deleteJob:deleteJob
}