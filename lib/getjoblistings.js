
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.joblists = function(req, res){
	
	Jobpost.find()
	.sort("-postedOn")
	.exec(function(err, posts) {
		if(err) {
			res.render( 'joblistings', {
				message: 'Internal error in showing current job listings. Please try after some time.',
				flag:false
		    });
		} else {
			console.log('Job posts count: '+Object.keys(posts).length);
			res.render( 'joblistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      user : req.user,
		      message:"",
		      flag:false
		    });
		}
	});    
};

exports.internaljoblists = function(req, res, type, msg){
	
	Jobpost.find()
	.sort("-postedOn")
	.exec(function(err, posts) {
		if(err) {
			res.render( 'joblistings', {
				message: 'Internal error in showing current job listings. Please try after some time.',
				flag:false
		    });
		} else {
			console.log('Job posts count: '+Object.keys(posts).length);  
			res.render( 'joblistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      user : req.user,
		      messageType: type,
		      message:msg,
		      flag:false
		    });
		}
	});    
};
