const express=require('express');
const router=express.Router();

router.get('/profile',function(req,res){
    if(res.locals.uid){
        res.render('user/profile');
    }
    else res.render('shared/401');
})

module.exports=router;