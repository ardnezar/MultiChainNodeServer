
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
	var username = req.user.local.username;
	console.log('jobSaleslists: '+username);  
	JobTransaction.find({"seller":username})
	.sort("-date")
	.exec(function(err, posts) {
		if(err) {
			res.write("");
			res.end();
		} else if(Object.keys(posts).length > 0) {
			console.log('jobSaleslists count: '+Object.keys(posts).length);  
			res.write(JSON.stringify(posts));
			res.end();
		} else {
			res.write("");
			res.end();
		}
	});   
};