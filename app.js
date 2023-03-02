const express=require('express');
const path=require('path');
const expressSession=require('express-session');

const db=require('./data/database');
const createSessionConfig=require('./config/session');
const homeRoutes=require('./routes/home.routes');
const authRoutes=require('./routes/auth.routes');
const userRoutes=require('./routes/user.routes');

const checkAuthStatusMiddleware=require('./middlewares/check-auth');
const errorHandlerMiddleware=require('./middlewares/error-handler');

const sessionConfig=createSessionConfig();

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(expressSession(sessionConfig));

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));


app.use(homeRoutes);
app.use(authRoutes);

app.use(checkAuthStatusMiddleware);
app.use(userRoutes);

app.use((req,res)=>{
    res.render('shared/404');
})

db.connectToDatabase()
    .then(()=>{
        app.listen(3000);
        console.log('connected to database');
        console.log('listening on port 3000');
    })
    .catch(()=>{
        console.log('failed to connect to database');
        console.log(error);
    })