
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var User = require('../models/user');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}

exports.transfer = function(req, res){
	var headers = req.headers;
	var user = req.user;
	var from_address = headers['referer'];
	var to = req.body.to
	var asset = 'dicoins';
	var qty = req.body.quantity
	
	console.log("Headers in transfer..headers:"+JSON.stringify(headers));
	
	console.log("Headers in transfer..req url:"+req.url);
	
	console.log("Headers in transfer..from_address:"+from_address);
	
	var myvar = from_address.split('?');
	
	if(myvar.length == 1) {
		//This is not a referrer. Try getting the from address from the req url
		myvar = req.url.split('?');
	}
	
	console.log("Headers in transfer1..from:"+from_address);
	
	console.log("Headers in transfer1:"+myvar[1]);
	
	
	
	var address = myvar[1].split('=');
	
	console.log("Headers in transfer2:"+address[1]);
	
	from_address = address[1];
	
	
    console.log("Headers in transfer assets:"+JSON.stringify(headers));
    console.log("Transfer from:"+from_address);
    console.log("Transfer to:"+req.body.to);
    console.log("Transfer qty:"+req.body.quantity);
    
    console.log("Transfer req body:"+JSON.stringify(req.body));
    
    if(from_address === null || to === null || asset === null || qty === null) {
    	res.render('transfer', 
    	{ 
    		message: 'Invalid transfer request.'
    	    		
    	}); 
    } else {
    	User.findOne({'local.username':  from_address }, function(err1, userFrom) {
    		if(err1) {
    			//Sending username nor present
    			res.render('transfer', 
		    	{ 
		    		message: 'Invalid sender address',
		    		from: from_address
		    	    		
		    	});
    		} else {
    			//Sending address valid
    			User.findOne({'local.username':  req.body.to }, function(err, userTo) {
    	    		if(err) {
    	    			res.render('transfer', 
    				    	{ 
    				    		message: 'Invalid recipient address.',
    				    		from: from_address
    				    	    		
    				    	});
    	    		} else if(userTo) {
    	    			//Valid user, get the actual address first
    	    			console.log("Recipient Address:"+userTo.local.address);
    				    var arr = [];
    				    arr.push(userFrom.local.address);
    				    arr.push(userTo.local.address);
    				    arr.push(asset);
    				    arr.push(qty);
    				    client.connect(connection, "sendassetfrom", arr, function (err, resp) {
    				    	if (err) {			    		
    				    		res.render('transfer', 
    		    		    	{ 
    		    		    		message: 'Error in transferring dicoins.',
    		    		    		from: from_address
    		    		    	    		
    		    		    	});
    				    	} else if(resp) {
    				    		if(resp.error) {
    				    			//There is an error transferring asset
    				    			//This might be due to some permission issue
    				    			res.render('transfer', 
    			    		    	{ 
    			    		    		message: 'Error in recipient permission.',
    			    		    		from: from_address
    			    		    	    		
    			    		    	});					    			
    				    		} else {
    				    			console.log("Setting transfer");
    				    			res.render('accounts', 
    			    		    	{ 
    			    		    		message: 'Transfer successful.',
    			    		    		user : userFrom
    			    		    	     		
    			    		    	});
    				    		}
    				    	}
    				    });
    	    		} else {
    	    			//Invalid state
    	    			console.log("Transfer Recipient not present..from:"+from_address);
    	    			res.render('transfer', 
    			    	{ 
    			    		message: 'Recipient not present.',
    			    		from: from_address
    			    	    		
    			    	});
    	    		}     		    	
    	    	});
    		}
    			
    		
    	});
    	
    }
};
