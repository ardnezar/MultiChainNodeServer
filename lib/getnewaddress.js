
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
	getNewAddress : function(cb){
	    client.connect(connection, "getnewaddress", null, function (err, resp) {
	    	if (err) {
	    		console.log("Error in getnewaddress");
                cb(err);
	    	} else {
	    		console.log("Getting getnewaddress");
	    		res.json(resp);
	    		return cb(null, resp);
	    	}
	    });
	}
};
