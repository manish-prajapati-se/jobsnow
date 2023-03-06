function employer(req,res,next){
    if(!(req.path.startsWith('/employer')) && !res.locals.uid){
        return res.render('shared/401') //not authenticated
    }
    next();
}



module.exports={
    employer:employer,
}