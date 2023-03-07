const path=require('path')
const fs=require('fs');

function getResume(req,res){
    const resumeId=req.params.id;
    const resumePath=path.join(__dirname,'..','user-data','resumes',resumeId);

    fs.access(resumePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if(err){
            console.log('requested file not found');
            res.render('shared/404');
        }else{

            res.sendFile(resumePath);
        }
      });
}

module.exports={
    getResume:getResume
}