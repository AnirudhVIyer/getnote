// this is the file where node is used with express js

var express = require('express');  
var morgan = require('morgan');
var mongoose = require('mongoose');

var blogroutes = require('./routes/blogroutes');
var authroutes = require('./routes/authroutes');

var PORT = process.env.PORT || 9000;



// like creating a server
var app = express();
app.use(morgan('tiny'));
app.use(express.urlencoded({useUnifiedTopology: true}));
// static middleware, files available for public to access
app.use(express.static('public'));


// mongo url // add your own MongoDB url
const DBurlBlog = "####";
// set view engine
app.set('view engine','ejs');
// starting a connection
mongoose.connect(process.env.MONGODB_URI || DBurlBlog,{useNewUrlParser:true , useUnifiedTopology:true})
.then((result)=>{
    console.log("connection succesfull");
    // we want our server to start listening now
    app.listen(PORT,()=>{
        console.log("express is listnening");
    
    });
})
.catch((err)=>{
    console.log(err);
});


// ------ Miscellaneous Routes ----------

// when server gets a get request 
// res.send automatically takes care of setting the res Header, and content type
app.get('/',(req,res)=>{

// using mongoose, rediret to blogs page
   res.redirect('/register');
   res.status(301);

});
app.get('/about',(req,res)=>{
 //ejs
  res.render('About',{title:'About'}); // just name of the ejs file

});
// redirect to about
app.get('/about-me',(req,res)=>{
    res.redirect('/about');
    res.status(301);
});

//-----Authentication Routes -------

app.use(authroutes);

//----------Blog Routes ------

app.use(blogroutes);

//------ Error-------------------

app.use((req,res)=>{
;
    res.render('Error',{title:'Error'});
});


