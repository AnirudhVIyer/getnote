var express = require('express');
var router = express.Router();
var Blog = require('../models/blogs');
var User = require('../models/User');
var crypto = require('crypto');
var validator = require('node-email-validator');


/// Going to Register Page without msg
router.get('/register',(req,res)=>{
    res.render('register',{title:"register",message:'Sign Up'});
});

/// Going to Register Page with msg of invalid user
router.get('/register/:msg',(req,res)=>{
    var msg = req.params.msg;
    res.render('register',{title:"register",message:msg});
});


// Registering a User
router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((result)=>{


       
    if(!result){

    let u = new User(req.body);
    u.password = crypto.createHash('sha1').update(u.password).digest('hex'); 
    validator(u.email)
    .then(result=>{
        u.save()
        .then(()=>{
            console.log('New User Stored');
        });
        res.redirect('/login/Login Again');
        
    })
    .catch(err=>{
        res.redirect('/register/Enter Valid Email');
    });

    }else{
        // user already existes 
        res.redirect('/login/User Already Exists');

    }

})
.catch(err=>console.log(err));

});



/// Going to Login page the first time

router.get('/login',(req,res)=>{
    var msg = req.params.msg;
    res.render('login',{title:"login",message:'Login'});
});


/// Going to Login page with msg
router.get('/login/:msg',(req,res)=>{
    var msg = req.params.msg;
    res.render('login',{title:"login",message:msg});
});


// Loging In
router.post('/login',(req,res)=>{
    let user = req.body;
    User.findOne({email:user.email})
    .then(result=>{
    if(!result){
        console.log('No user found');
        res.redirect('/login/No User Found');
        
    }
    else{
        //console.log(result.password);
        //console.log(user);

        var userpass = crypto.createHash('sha1').update(user.password).digest('hex'); 
        

        
        
        if(result.password == userpass){
            let key = result.email;
            let name = result.name;
            console.log('password match');
            res.redirect('/blogs/'+key);
            
        }else{
            console.log('password incorrect');
            res.redirect('/login/Incorrect Password');
            
        }
        
    }
});


});



module.exports = router;