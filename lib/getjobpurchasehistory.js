
/*
 * GET job ppurchase history
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

exports.jobPurchaselists = function(req, res){
	var username = req.user.local.username;
	console.log('jobPurchaselists: '+username);  
	JobTransaction.find({"buyer":username},function(err, posts) {
		if(err) {
			res.render( 'purchaselistings', {
				message: 'Internal error in showing job purchase listings. Please try after some time.' 			 
		    });
		} else if(Object.keys(posts).length > 0) {
			console.log('Job posts: '+JSON.stringify(posts));  
			res.render( 'purchaselistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      message:""
		    });
		} else {
			res.render('accounts.ejs', {
            	message: 'You have not purchased any jobs',
                user : req.user // get the user out of session and pass to template            
            });
		}
	});
    
};
