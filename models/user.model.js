const bcrypt=require('bcryptjs');
const db=require('../data/database');

class User{
    constructor(email,password,fullname){
        this.email=email;
        this.password=password;
        this.name=fullname;
        this.resume='';
        this.appliedJobs=[];
    }

    async signup(){
        const hashedPassword=await bcrypt.hash(this.password,12);
        await db.getDb().collection('users').insertOne({
            email:this.email.trim(),
            password:hashedPassword,
            name:this.name.trim(),
            resume:''
        });
        console.log('new user added');
    }

    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({email:this.email});
    }
    
    async userExists(){
        const existingUser=await this.getUserWithSameEmail();
        // console.log(existingUser);
        if(!existingUser){
            return false;
        }
        return true;
    }

    async hasMatchingPassword(hashedPasswordOfExistingUser){
        return bcrypt.compare(this.password,hashedPasswordOfExistingUser);

    }

    static async getUserById(userId){
        const user=await db.getDb().collection('users').findOne({_id:userId});
        return user;
    }

    static async updateUserById(userId,updatedUser){
        await db.getDb().collection('users').updateOne({_id:userId},{
            $set:{
                name:updatedUser.name,
                resume:updatedUser.resume
            }
        })
    }
    
    static async addAppliedJob(userId,jobId){
        const user=await db.getDb().collection('users').findOne({_id:userId});

        const alreadyAppliedJobs=user.appliedJobs;

        if(alreadyAppliedJobs){
            for(const alreadyAppliedJob of alreadyAppliedJobs){
                if(alreadyAppliedJob.jobId.equals(jobId)){
                    console.log('already applied');
                    return; 
                } 
            }

        }


        let appliedJob={
            jobId: jobId,
            applicationTime: new Date()
        }

        await db.getDb().collection('users').updateOne({_id:userId},{$addToSet:{appliedJobs:appliedJob}});
    }

    static async removeAppliedJob(userId,jobId){
        const user=await User.getUserById(userId);
        let appliedJobToRemove;
        for(const appliedJob of user.appliedJobs){
            if(appliedJob.jobId.equals(jobId)){
                appliedJobToRemove=appliedJob;
                break;
            }
        }

        // console.log(appliedJobToRemove);
        if(!appliedJobToRemove) return;
        console.log(appliedJobToRemove);
        await db.getDb().collection('users').updateOne({_id:userId},{$pull: {appliedJobs:{jobId:appliedJobToRemove.jobId}}})
    }

    static async getAppliedJobs(userId){
        const user=await this.getUserById(userId);
        return user.appliedJobs;
    }
}

module.exports=User;