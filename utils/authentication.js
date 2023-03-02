function createUserSession(req,user,action){
    // console.log(user._id);
    req.session.uid=user._id.toString();
    req.session.save(action);
}

function destroyUserAuthSession(req){
    // on the server the uid in the session is set to null
    req.session.uid=null;
}

module.exports={
    createUserSession:createUserSession,
    destroyUserAuthSession:destroyUserAuthSession
}