
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

//exports.getaddressbalance = function(req, res){
////  res.render('index', { title: 'Express' });
////	res.send('Hello');
////	var client = simpleClient(connection);
////var arr = ["1BfLZ1RrC1gmNw9A9TNyiWhHJbtDLfY57KPgwF"];
//var headers = req.headers;
//var addr = headers['address'];
//		    		console.log("Address in getaddressbalance:"+addr);
//var arr = [];
//arr.push(addr);
//    client.connect(connection, "getaddressbalances", 
//    		arr, 
//                  function (err, resp) {
//		    	if (err) {
//		    		console.log("Error in getaddressbalance");
//		                res.send("Error in getaddressbalance..code\n");
//		    	} else {
//		    		console.log("Getting getblock");
//		    		res.json(resp);
//		    	}
//    });
//};

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
