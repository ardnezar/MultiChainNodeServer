
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var User = require('../models/user');

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

module.exports = {
		grantPermission : function(address, cb){
			var asset = 'dicoins_v2';
			
			console.log("grantPermission..address:"+address);
		    
		    address = address.replace(/"/g, '');
		    
		    if(address === null) {
		    	cb('Invalid grant permission request.', null); 
		    } else {		    	
		    	var arr = [];
		    	var permission = "send,receive";
//		    	permission = permission.replace(/"/g, '');
			    arr.push(address);
			    arr.push(permission);
			    client.connect(connection, "grant", arr, function (err, resp) {
			    	if (err) {			    		
			    		cb(err, null); 	
			    	} else if(resp) {
			    		console.log("Grant permission successful..resp:"+JSON.stringify(resp));
			    		if(resp.error) {
			    			//There is an error transferring asset
			    			//This might be due to some permission issue		    				    			
			    			cb(resp.error, null); 					    			
			    		} else {
			    			console.log("Grant permission successful..updating balance");
			    			cb(null, resp); 
			    		}
			    	}
			    });
		    }
		}	
};


