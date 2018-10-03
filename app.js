const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const passport = require("passport");
const User = require('./models/user');
const Item = require('./models/item');
const port = process.env.PORT || 3000;

const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose"); 
mongoose.connect('mongodb://localhost/assesment2',{ useCreateIndex: true, useNewUrlParser: true })
 
const ejs = require('ejs');
const app = express();

app.use(bodyparser.urlencoded({extended : true}));

app.set('view engine','ejs');

app.use(require("express-session")({
    secret:"Sessions are interesting to learn",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/',(req,res)=>{
res.send('welcome to home route!')
});
app.get('/register', (req, res, next) => {
    res.render('register');
});

app.post('/register',(req,res)=>{
    User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,()=>{
            res.render("login");
        })
    });
});
app.get('/login', (req, res) => {
    res.render('login');
 });
 app.post('/login',passport.authenticate("local",{
     successRedirect:"/bid",
     failureRedirect:"/login"
 }),(req,res)=>{

 });
app.get('/logout',(req,res)=>{
 req.logout();
 res.redirect('/login')
})
app.get('/session',isLoggedIn,(req,res)=>{
    res.render("session");

})
app.get('/santhosh',isLoggedIn,(req,res)=>{
    res.render("santhosh");

})
app.get('/bid',isLoggedIn,(req,res)=>{
    res.render('bid');
})
app.post('/bid',(req,res)=>{

 
    Item.create(new Item({name:req.body.name,description:req.body.description,image:req.body.image,date:req.body.date,bids:req.body.bids}),(err,item)=>{
        if(err){
            console.log(err);
            return res.render("bid");
        }
       else{
           res.send('Bid is placed!')
       }
    });
})
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(port, (req, res)=>{
    console.log(`Server running on port ${port}`);
});