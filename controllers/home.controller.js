function getHome(req,res){
    res.render('home/index');
}

module.exports={
    getHome:getHome
}