
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var User   = require('../models/user');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

module.exports = {
		getaccountinfo : function(req, res) { 
			var username = req.user.local.username;
			User.findOne({ 'local.username' :  username }, 
	          function(err, user) {			            			            
	            var client = require("../lib/getaddressbalance");
	            
	            if(user.local.address) {
	            	console.log('Valid address Extracting balance');
			        client.getaddressbalance(user.local.address, function (err, balance) {
			       		if(balance) {	        				        			
				    		//Update balance
			       			if(balance.length > 0) {
		            			user.local.balance = balance[0].qty;
		            			console.log('Valid address Extracting balance:'+balance[0].qty);
		            			user.save(function(err) {
		    	            		if (err)
		    	            			console.log('error')
		    	        			else
		    	            	        console.log('success')
		    	        	    });
			       			} else {
			       				console.log("Valid address Extracting balance...zero balance");
			       			}
			       			res.render('accounts.ejs', {
				            	message: '',
				                user : req.user // get the user out of session and pass to template            
				            });
			       			
			        	} else {
			        		res.render('accounts.ejs', {
				            	message: '',
				                user : req.user // get the user out of session and pass to template            
				            });
			        	}			       		
			       		
			    	});
	            } else {
	            	console.log('Address not present');            	
	            	req.logout();
	                res.redirect('/');
	            }
	          });
		}
	};
