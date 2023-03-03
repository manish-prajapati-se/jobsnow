const express=require('express');

const router=express.Router();

const jobsController=require('../controllers/jobs.controller')

router.get('/jobs',jobsController.getAllJobs);

router.get('/jobs/:id',jobsController.getJobDetails);

router.get('/post-job',jobsController.getPostJob);
module.exports=router;