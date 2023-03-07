const express=require('express');
const employerController=require('../controllers/employer.controller');

const router=express.Router();

router.get('/dashboard',employerController.getDashboard);

router.get('/post-job',employerController.getPostJob);

router.post('/post-job',employerController.postJob);

router.post('/delete-job/:id',employerController.deleteJob);

module.exports=router;