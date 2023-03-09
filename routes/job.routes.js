const express=require('express');

const router=express.Router();

const jobsController=require('../controllers/jobs.controller')

router.get('/jobs',jobsController.getAllJobs);

router.post('/jobs/:id/withdraw',jobsController.withdrawJob);

router.get('/jobs/:id',jobsController.getJobDetails);

router.post('/jobs/:id/apply',jobsController.applyToJob);


module.exports=router;