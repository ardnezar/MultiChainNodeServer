
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var User   = require('../models/user');
var http = require('http');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};


exports.sendMessage = function(msg, address) {
	console.log('sendMessage...address:'+address);
	User.findOne({ 'local.address' :  address }, 
	          function(err, user) {
					if(user) {		            
			            if(user.local.phonenumber) {
		            		console.log('sendMessage...phonenumber:'+user.local.phonenumber);
	
	
			          	  	// An object of options to indicate where to post to
			          	  	var post_options = {
				          	      host: '162.243.140.36',
				          	      path: '/messages/v1/message',
				          	      method: 'POST',
				          	      headers: {
				          	          'Content-Type': 'application/json'	         
				          	      }
			          	  	};
		
			          	  	// Set up the request
			          	  	var post_req = http.request(post_options, function(res) {
				          	      res.setEncoding('utf8');
				          	      res.on('data', function (chunk) {
				          	          console.log('Response: ' + chunk);
				          	      });
			          	  	});
				          	  
			          	  	var bodyString = JSON.stringify({
				          		  message: msg,
				          		  phoneNumber: user.local.phonenumber
			          	  	});
		
			          	  	post_req.write(bodyString);
			          	  	post_req.end();
			            }
					}
	          });
	
	
		
	  
	  
	  
//	var username = req.user.local.username;
//	User.findOne({ 'local.username' :  username }, 
//	  function(err, user) {			            			            
//	    var client = require("../lib/getaddressbalance");
//	    
//	    if(user.local.address) {
//	    	console.log('Valid address Extracting balance');
//	        client.getaddressbalance(user.local.address, function (err, balance) {
//	       		if(balance) {	        				        			
//		    		//Update balance
//	       			if(balance.length > 0) {
//	        			user.local.balance = balance[0].qty;
//	        			console.log('Valid address Extracting balance:'+balance[0].qty);
//	        			user.save(function(err) {
//		            		if (err)
//		            			console.log('error')
//		        			else
//		            	        console.log('success')
//		        	    });
//	       			} else {
//	       				console.log("Valid address Extracting balance...zero balance");
//	       			}
//	       			res.render('accounts.ejs', {
//		            	message: '',
//		                user : req.user // get the user out of session and pass to template            
//		            });
//	       			
//	        	} else {
//	        		res.render('accounts.ejs', {
//		            	message: '',
//		                user : req.user // get the user out of session and pass to template            
//		            });
//	        	}			       		
//	       		
//	    	});
//	    } else {
//	    	console.log('Address not present');            	
//	//	            	req.logout();
//	//	                res.redirect('/');
//	    	res.render('accounts.ejs', {
//	        	message: 'Balance not available.',
//	            user : req.user // get the user out of session and pass to template            
//	        });
//	    }
//	  });
};

