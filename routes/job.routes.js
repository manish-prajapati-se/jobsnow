const express=require('express');

const router=express.Router();

const jobsController=require('../controllers/jobs.controller')

router.get('/jobs',jobsController.getAllJobs);

router.get('/jobs/:id',jobsController.getJobDetails);

module.exports=router;