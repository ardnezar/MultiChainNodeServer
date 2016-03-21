
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

exports.getaddressbalance = function(req, res){
//  res.render('index', { title: 'Express' });
//	res.send('Hello');
//	var client = simpleClient(connection);
    client.connect(connection, "getaddressbalances", 
    		client.getParams({
	        address: '1BfLZ1RrC1gmNw9A9TNyiWhHJbtDLfY57KPgwF',
	        minconf: 0
	    	}), function (err, resp) {
		    	if (err) {
		    		console.log("Error in getaddressbalance");
		                res.send("Error in getaddressbalance..code\n");
		    	} else {
		    		console.log("Getting getblock");
		    		res.json(resp);
		    	}
    });
};
