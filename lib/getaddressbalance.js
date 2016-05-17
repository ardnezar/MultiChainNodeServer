
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

module.exports = {
		getaddressbalance : function(addr, cb){
			addr = addr.replace(/"/g, ''); 
			var arr = [];
			arr.push(addr);
		        console.log("Getaddressbalance for address:"+addr);
		    client.connect(connection, "getaddressbalances", 
		    		arr, function (err, resp) {
		    	if (err) {
		    		console.log("Error in getaddressbalance");
	                cb(err, null);
		    	} else {
		    		console.log("Getting getaddressbalance"+JSON.stringify(resp));
		    		var assetBalance = 0;
		    		var i = null; 		    					    			
		    	    for (i = 0; resp.length > i; i += 1) {
		    	        if (balance[i].name === "dicoins_v2") {
		    	        	console.log("getaddressbalance dicoins_v2 balance:"+balance[i].qty);
		    	        	assetBalance = balance[i].qty;
		    	        	break;
		    	        }
		    	    }
		    		return cb(null, assetBalance);
		    	}
		    });
		}
	};
