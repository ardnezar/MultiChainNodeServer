
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var User   = require('../models/user');
var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

var gettrans = require('../lib/gettransactions');
var JobTransaction = require('../models/jobpurchasehistory');
var XMLHttpReq = require('xhr2');

module.exports = {
		getaccountinfo : function(req, res) { 
			var username = req.user.local.username;
			User.findOne({ 'local.username' :  username }, 
	          function(err, user) {			            			            
	            var client = require("../lib/getaddressbalance");
	            
	            if(user.local.address) {
	            	console.log('Valid address Extracting balance');
	            	client.getaddressbalance(user.local.address, function (err, balance) {
			        	if(err) {
			        		res.render('accounts.ejs', {
				            	message: '',
				                user : req.user, // get the user out of session and pass to template
				                flag: false				               
				            });
			        	} else {	        				        			
				    		//Update balance				    	    
				    	    user.local.balance = balance;	            								    	    					    	  
	            			console.log('getaccountinfo..Valid address Extracting balance:'+balance);	            			
	            			var newMessage = '';
	            			if(balance === 0 && user.local.validated !== true) {
	            				newMessage = 'Almost there! You will receive 100 labcoins very soon, please refresh this page in about 20 seconds.';
	            				user.local.validated = true;
	            				res.render('accounts.ejs', {	            					
					            	message: newMessage,
					                user : req.user, // get the user out of session and pass to template,
					                flag: false
					            });
	            			} else {
	            				user.local.validated = true;
				       			res.render('accounts.ejs', {
					            	message: '',
					                user : req.user, // get the user out of session and pass to template,
					                flag: false
					            });
	            			}
	            			
	            			user.save(function(err) {
	    	            		if (err)
	    	            			console.log('error')
	    	        			else
	    	            	        console.log('success')
	    	        	    });
			        	}			       		
			       		
			    	});
	            } else {
	            	console.log('Address not present');
	            	res.render('accounts.ejs', {
		            	message: 'Balance not available.',
		                user : req.user, // get the user out of session and pass to template
		                flag: false
		            });
	            }
	          });
			
		}
	};
