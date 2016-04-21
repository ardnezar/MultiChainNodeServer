
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
	                cb(err);
		    	} else {
		    		console.log("Getting getaddressbalance"+JSON.stringify(resp));
		    		return cb(null, resp);
		    	}
		    });
		}
	};
