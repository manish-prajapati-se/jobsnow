const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const resumeUploadMiddleware=require('../middlewares/resume-upload');


router.get('/profile',userController.getUser);

router.post('/profile/:id',resumeUploadMiddleware,userController.updateUser);

module.exports=router;