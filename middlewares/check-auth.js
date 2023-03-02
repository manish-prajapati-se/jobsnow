function checkAuthStatus(req,res,next){
    const uid=req.session.uid;  //check whether uid in session exists or not on the server
    // console.log(req);

    if(!uid){
        return next();
    }

    res.locals.uid=uid; //make uid globally available
                        //only for 1 request response cycle
    next();
}

module.exports=checkAuthStatus;