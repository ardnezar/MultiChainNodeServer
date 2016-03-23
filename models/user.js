/**
 * http://usejsdoc.org/
 */
//var mongoose = require('mongoose');
////var mongo = require('mongodb');
// 
//module.exports = mongoose.model('User',{
//        username: String,
//    password: String,
//    email: String,
//    gender: String,
//    address: String
//});


//function Users() {
//    if (!(this instanceof Users)) {
//            return new Users();
//    }
//
//    // require mongodb
//    var mongo = require('mongodb');
//    // Connect to our mongodb running on localhost and named 'test'
//    var db = require('monk')('localhost:27017/webrtc');
//    // obtain a reference to our cars collection within mongodb
//    this.users = db.get('users');
//};


// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        password     : String,
        address      : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);