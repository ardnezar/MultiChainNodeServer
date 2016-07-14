
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.getinfo = function(req, res){
//  res.render('index', { title: 'Express' });
//	res.send('Hello');
//	var client = simpleClient(connection);
//    client.connect(connection, "getinfo", null, function (err, resp) {
////        cb(err, res);
//    	if (err) {
//    		console.log("Error in getblock");
//                res.send("Error in getblock..code\n");
//    	} else {
//    		console.log("Getting getblock");
//    		res.json(resp);
//    	}
//    });
};
