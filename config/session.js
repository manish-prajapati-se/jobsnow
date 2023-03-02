const mongoDbStore=require('connect-mongodb-session');
const expressSession=require('express-session');


function createSessionStore(){  //create a session store in MongoDB database

    
    const MongoDBStore=mongoDbStore(expressSession);    //create mongoDB store

    const store=new MongoDBStore({
        uri:'mongodb://localhost:27017',
        databaseName:'jobsnow',
        collection:'sessions'
    })

    return store;
}

function createSessionConfig(){
    //express-session wants an object with all configuration settings
    return {
        secret:'super-secret',
        resave:false, //update the session only when data in it changed;
        saveUninitialized:false,
        store:createSessionStore(),
        cookie:{
            maxAge:2*24*60*60*1000 //2days
        }
    }
}

module.exports=createSessionConfig;