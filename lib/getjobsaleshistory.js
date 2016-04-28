
/*
 * GET Job sales history
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');
var JobTransaction = require('../models/jobpurchasehistory');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.jobSaleslists = function(req, res){
	var useraddress = req.user.local.address;
	console.log('jobSaleslists: '+useraddress);  
	JobTransaction.find({"seller":useraddress},function(err, posts) {
		if(err) {
			res.render( 'saleslistings', {
				message: 'Internal error in showing job purchase listings. Please try after some time.' 			 
		    });
		} else {
			console.log('Job posts: '+JSON.stringify(posts));  
			res.render( 'saleslistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      message:""
		    });
		}
	});
    
};