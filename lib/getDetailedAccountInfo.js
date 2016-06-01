
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var User   = require('../models/user');
var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

var gettrans = require('../lib/gettransactions');
var JobTransaction = require('../models/jobpurchasehistory');
var client = require("../lib/testclient");

module.exports = {
		getaccountinfo : function(req, res) { 
			var username = req.user.local.username;
			console.log('Valid address Extracting balance111...username:'+username);
//			res.render('accounts.ejs', {
//            	message: 'Balance not available.',
//                user : req.user, // get the user out of session and pass to template
//                flag: true
//            });
//			User.findOne({ 'local.username' :  username }, 
//	          function(err, user) {			            			            
//	            var client = require("../lib/getaddressbalance");
//	            
//	            if(user.local.address) {
//	            	console.log('Valid address Extracting balance');
//	            	client.getaddressbalance(user.local.address, function (err, balance) {
//			        	if(err) {
//			        		console.log('Valid address Extracting balance error');
//			        		res.render('index.ejs', {
//				            	message: '',
//				                user : req.user // get the user out of session and pass to template
//				            });
//			        	} else {	        				        			
//				    		//Update balance				    	    
//				    	    user.local.balance = balance;	            								    	    					    	  
//	            			console.log('Valid address Extracting balance:'+balance);
//	            			user.save(function(err) {
//	    	            		if (err)
//	    	            			console.log('error')
//	    	        			else
//	    	            	        console.log('success')
//	    	        	    });
//			       			res.render('accountsDetailed.ejs', {
//				            	message: '',
//				                user : req.user, // get the user out of session and pass to template,
//				                flag: true
//				            });			       					       						       			
//			        	}			       		
//			       		
//			    	});
//	            } else {
//	            	console.log('Address not present');
//	            	res.render('accountsDetailed.ejs', {
//		            	message: 'Balance not available.',
//		                user : req.user, // get the user out of session and pass to template
//		                flag: true
//		            });
//	            }
//	          });
			JobTransaction.find({"buyer":username})
			.sort("-date")
			.exec(function(err, posts) {
//				if(err) {
//					res.render( 'purchaselistings', {
//						message: 'Internal error in showing job purchase listings. Please try after some time.' 			 
//				    });
//				} else if(Object.keys(posts).length > 0) {
//					console.log('Job posts: '+JSON.stringify(posts));  
//					res.render( 'purchaselistings', 
//					{
//				      title : 'Jobs listings',
//				      posts : posts,
//				      message:""
//				    });
//				} else {
//					res.render('accounts.ejs', {
//		            	message: 'You have not purchased any jobs',
//		                user : req.user // get the user out of session and pass to template            
//		            });
//				}
				res.write(JSON.stringify(posts));
				res.end();
			});
			
		}
	};
