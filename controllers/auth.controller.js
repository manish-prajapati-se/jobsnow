const User=require('../models/user.model');
const authUtils=require('../utils/authentication');
const validationUtils=require('../utils/validation');

function getSignup(req,res){
    let sessionInputData=req.session.inputData;

    if(!sessionInputData){
        sessionInputData={
            hasError:false,
            errorStatus:{
                isEmailValid:true,
                isNameValid:true,
                isPasswordValid:true
            },
            emailExists:false,
            email:'',
            name:'',
            password:''
        }
    }

    res.render('auth/signup',{inputData:sessionInputData});

}

async function signup(req,res){
    const user={
        email: req.body.email,
        password:req.body.password,
        name: req.body.fullname
    };


    const isEmailValid=validationUtils.isEmailValid(user.email);
    const isPasswordValid=validationUtils.isPasswordValid(user.password);
    const isNameValid=validationUtils.isNameValid(user.name);
    
    if(!isEmailValid || !isPasswordValid || !isNameValid){
        req.session.inputData={
            hasError:true,
            errorStatus:{
                isEmailValid:isEmailValid,
                isNameValid:isNameValid,
                isPasswordValid:isPasswordValid
            },
            email:user.email,
            name:user.name,
            password:user.password
        }
        req.session.save(()=>{
            return res.redirect('/signup');
        })
        return;
    }

    
    const newUser=new User(user.email,user.password,user.name);

    const userExists=await newUser.userExists();


    if(userExists){
        req.session.inputData={
            hasError:true,
            errorStatus:{
                isEmailValid:isEmailValid,
                isNameValid:isNameValid,
                isPasswordValid:isPasswordValid
            },
            emailExists:true,
            email:user.email,
            name:user.name,
            password:user.password
        }

        req.session.save(()=>{
            console.log('user exists already');
            return res.redirect('/signup');
        })
        return;
    }

    req.session.inputData=null;
    newUser.signup();

    res.redirect('/login');
}

function getLogin(req,res){
    let sessionInputData=req.session.inputData;
    if(!sessionInputData){
        sessionInputData={
            hasError:false,
            errorStatus:{
                isEmailValid:true,
                isPasswordValid:true
            },
            emailExists:true,
            email:'',
            password:''
        }
    }
    res.render('auth/login',{inputData:sessionInputData});
}

async function login(req,res){
    const isEmailValid=validationUtils.isEmailValid(req.body.email);

    if(!isEmailValid){
        req.session.inputData={
            hasError:true,
            errorStatus:{
                isEmailValid:false,
                isPasswordValid:true
            },
            emailExists:true,
            email:req.body.email,
            password:req.body.password
        }

        req.session.save(()=>{
            return res.redirect('/login');
        })
        return;
    }

    //1. credentials sent by user
    const user=new User(req.body.email,req.body.password);
    
    //2. validation of credentials on the server side
    let existingUser;
    existingUser=await user.getUserWithSameEmail();

    if(!existingUser){
        console.log('user does not exist');
        req.session.inputData={
            hasError:true,
            errorStatus:{
                isEmailValid:true,
                isPasswordValid:true
            },
            emailExists:false,
            email:req.body.email,
            password:req.body.password
        }
        
        req.session.save(()=>{
            return res.redirect('/login');
        })

        return;
    }

    const passwordIsCorrect=await user.hasMatchingPassword(existingUser.password);

    if(!passwordIsCorrect){
        req.session.inputData={
            hasError:true,
            errorStatus:{
                isEmailValid:true,
                isPasswordValid:false
            },
            emailExists:true,
            email:req.body.email,
            password:req.body.password
        }
        
        req.session.save(()=>{
            console.log('password incorrect');
            return res.redirect('/login');
        })
        return;
    }

    req.session.inputData=null;

    //3. Create a session in the database with unique sessionId
    authUtils.createUserSession(req,existingUser,()=>{
        
        // this code is exectuted once the session data is written to the database

        console.log('new session created on the server');
        
        //4. express-session package adds a set-Cookie key in the response header
        //5. the cookie contains the sessionId and is stored locally on the browser

        res.redirect('/profile');

        //6. the cookie will now be attached to all the subsequent requests
    })
    
}


async function logout(req,res){
    authUtils.destroyUserAuthSession(req);
    res.redirect('/login');
}


module.exports={
    getSignup:getSignup,
    getLogin:getLogin,
    signup:signup,
    login:login,
    logout:logout
}