var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {
        type:String,
        required :true
    },
    email:{
        type:String,
        required :true

    },
    password:{
        type:String,
        required :true

    }
},
{timestamps :true}
);

// argument should be the singular of the collections name "blogs" : 'Blog
var User = mongoose.model('User',UserSchema);

module.exports = User;