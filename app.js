const express=require('express');
const path=require('path');
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
const homeRoutes=require('./routes/home.routes');
const authRoutes=require('./routes/auth.routes');
const exp = require('constants');

app.use(homeRoutes);
app.use(authRoutes);


app.listen(3000);
