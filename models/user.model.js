const bcrypt=require('bcryptjs');
const db=require('../data/database');

class User{
    constructor(email,password,fullname){
        this.email=email;
        this.password=password;
        this.name=fullname;
    }

    async signup(){
        const hashedPassword=await bcrypt.hash(this.password,12);
        await db.getDb().collection('users').insertOne({
            email:this.email.trim(),
            password:hashedPassword,
            name:this.name.trim()
        });
        console.log('new user added');
    }

    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({email:this.email});
    }
    
    async userExists(){
        const existingUser=await this.getUserWithSameEmail();
        console.log(existingUser);
        if(!existingUser){
            return false;
        }
        return true;
    }

    async hasMatchingPassword(hashedPasswordOfExistingUser){
        return bcrypt.compare(this.password,hashedPasswordOfExistingUser);

    }
}

module.exports=User;