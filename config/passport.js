/**
 * http://usejsdoc.org/
 */


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/user');
//
//
//var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	console.log("method1");
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	console.log("method2");
        User.findById(id, function(err, user) {
        	console.log("method3");
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({

        passReqToCallback : true
      },
      function(req, username, password, done) {
        findOrCreateUser = function(){
        	
        	var addr = req.param('address');
        	console.log("Signing up user with addr:"+addr);
//        	var newUser1 = new User();
//            // set the user's local credentials
//            newUser1.local.username = username;
//            //newUser1.local.password = newUser.generateHash(password);
//            newUser1.local.address = addr
            User.findOne({'address':addr},function(err, topuser) {
    			if (topuser){
	  	            console.log('This address already exists: '+topuser.username);
	  	            return done(null, false, 
	  		                 req.flash('signupMessage','Address already exists.'));
  	            } else {
  	            	console.log('This address does not exist');
  	            }	
    		});
	          // find a user in Mongo with provided username
    		User.findOne({'local.username':username},function(err, user) {
	            if (err){
	              console.log('Error in SignUp: '+err);
	              return done(err);
	            }
	          
	            if (user) {
	              console.log('User already exists');
	              return done(null, false, 
	                 req.flash('signupMessage','User already exists.'));
	            } else {
	              // if there is no user with that email
	              // create the user
	              console.log('Creating new user with addr:'+addr);
	              var newUser = new User();
	              // set the user's local credentials
	              newUser.local.username = username;
	              newUser.local.password = newUser.generateHash(password);
	              newUser.local.address = addr
	//              newUser.firstName = req.param('firstName');
	//              newUser.lastName = req.param('lastName');
	     
	              // save the user
	              newUser.save(function(err) {
	                if (err){
	                  console.log('Error in Saving user: '+err);  
	                  throw err;  
	                }
	                console.log('User Registration successful');    
	                return done(null, newUser);
	              });
	            }
	          });
        };
         
        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
    
    //passport/login.js
    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true
      },
      function(req, username, password, done) { 
        // check in mongo if a user with username exists or not
        User.findOne({ 'local.username' :  username }, 
          function(err, user) {
            // In case of any error, return using the done method
            if (err)
              return done(err);
            // Username does not exist, log error & redirect back
            if (!user){
              console.log('User Not Found with username '+username);
              return done(null, false, 
                    req.flash('loginMessage', 'User not found.'));                 
            }
            // User exists but wrong password, log the error 
            if (!user.validPassword(password)){
              console.log('Invalid Password');
              return done(null, false, 
                  req.flash('loginMessage', 'Invalid Password'));
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
          }
        );
    }));
};



