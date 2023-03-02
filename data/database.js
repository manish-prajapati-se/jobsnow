//connect backend to the mongodb local database
const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;

let database;

async function connectToDatabase(){
    const client=await MongoClient.connect('mongodb://localhost:27017');
    database=client.db('jobsnow');
}

function getDb(){
    if(!database){
        throw new Error('Could not connect to database');
    }
    return database;
}

module.exports={
    connectToDatabase:connectToDatabase,
    getDb:getDb
}


// connectToDatabase()
//     .then(()=>{
//         getDb();
//     })
//     .catch(()=>{
//         console.log('could not connect to database.')
//     })

















