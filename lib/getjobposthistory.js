
/*
 * GET job posted history
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

exports.jobPostlists = function(req, res){
	var username = req.user.local.username;
	console.log('jobPurchaselists: '+username);  
	Jobpost.find({"username":username})
	.sort("-postedOn")
	.exec(function(err, posts) {
		if(err) {
			res.write("");
			res.end();
		} else if(Object.keys(posts).length > 0) {
			console.log('Job posts length: '+Object.keys(posts).length);  			
			res.write(JSON.stringify(posts));
			res.end();
            
		} else {
			res.write("");
			res.end();
		}
	});
    
};
