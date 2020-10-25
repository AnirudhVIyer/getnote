var express = require('express');
var router = express.Router();
var Blog = require('../models/blogs');
var User = require('../models/User');
var crypto = require('crypto');


//----- Display All blogs---------
router.get('/blogs/:key',(req,res)=>{
    var name;
    var key = req.params.key;

    
    
    // first get the blogs
    Blog.find({email:key}).sort()
    .then(result=>{
        res.render('index',{title:"All-Blogs",blog : result, key:key});
    })
    .catch(err=>{
        console.log(err);
    });
});

//----- AFTER CREATING A BLOG------//
// here /blogs/:key and /blog/:id , can cause confusion, :id will take :keys request 

router.post('/blogs/:key',(req,res)=>{
    var key = req.params.key;
    // the post method req has body as the object that we want
    var newBody = new Blog({
        email:key,
        title : req.body.title,
        snippet: req.body.snippet,
        body: req.body.body


    });
    newBody.save()
    .then(result=>{
        res.redirect('/blogs/'+key);// a get request
    })
    .catch(err=>{
        console.log(err);
    });


});

//------delete--------
router.delete('/blogs/:key/:id',(req,res)=>{
    var key = req.params.key;
    var id = req.params.id;
    console.log(id);
    Blog.findByIdAndDelete(id)  // cant redirect have to do that in the front end
    .then(()=>{
        res.json({redirect:'/blogs/'+key});

    
    })
    .catch(err=>{
        console.log(err);
    });

});


// -----Create Page ------//
router.get('/blogs/create/:key',(req,res)=>{

    var key = req.params.key;

    //ejs
   res.render('create',{title:'create',key:key}); // just name of the ejs file

});

// -------Single Blog -------//
router.get('/blogs/single/:id',(req,res)=>{
    
    var id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details', {title:'Blog Details',blog : result,key :result.email});
        console.log('done')
    })
    .catch(err=>{
        console.log('cant find');
    })
});



module.exports = router;