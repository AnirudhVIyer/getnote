var mongoose = require('mongoose');

var BlogSchema = mongoose.Schema({
    email: {
        type:String,
        required :true

    },
    title: {
        type:String,
        required :true
    },
    snippet:{
        type:String,
        required :true

    },
    body:{
        type:String,
        required :true

    }
},
{timestamps :true}
);

// argument should be the singular of the collections name "blogs" : 'Blog
var Blog = mongoose.model('Blog',BlogSchema);

module.exports = Blog;