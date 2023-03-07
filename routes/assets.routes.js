const express=require('express');
const assetsController=require('../controllers/assets.controller');

const router=express.Router();

router.get('/resume/:id',assetsController.getResume);

module.exports=router;