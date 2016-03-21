
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

exports.transfer = function(req, res){
//  res.render('index', { title: 'Express' });
//	res.send('Hello');
//	var client = simpleClient(connection);
//var arr = ["1BfLZ1RrC1gmNw9A9TNyiWhHJbtDLfY57KPgwF"];
	var headers = req.headers;
	var from = headers['from'];
	var to = headers['to'];
	var asset = headers['asset-name'];
	var qty = headers['quantity'];
	
    console.log("Address in getaddressbalance:"+addr);
    
    if(from === null || to === null || asset === null || qty === null) {
    	res.send("Error in transferring assets.\n");
    } else {
		var arr = [];
		arr.push(addr);
	    client.connect(connection, "getaddressbalances", 
	    		arr, 
	                  function (err, resp) {
			    	if (err) {
			    		console.log("Error in transferring assets");
			    		res.send("Error in transferring assets.\n");
			    	} else {
			    		console.log("Setting trasfer");
			    		res.json(resp);
			    	}
	    });
    }
};
