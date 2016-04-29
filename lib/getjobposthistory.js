
/*
 * GET job posted history
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.jobPostlists = function(req, res){
	var username = req.user.local.username;
	console.log('jobPurchaselists: '+username);  
	Jobpost.find({"username":username},function(err, posts) {
		if(err) {
			res.render( 'jobpostbyuserlistings', {
				message: 'Internal error in showing job post listings. Please try after some time.' 			 
		    });
		} else if(Object.keys(posts).length > 0) {
			console.log('Job posts: '+JSON.stringify(posts));  
			res.render( 'jobpostbyuserlistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      message:""
		    });
		} else {
			res.render('accounts.ejs', {
            	message: 'You have not posted any job',
                user : req.user // get the user out of session and pass to template            
            });
		}
	});
    
};
