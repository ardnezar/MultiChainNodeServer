
/*
 * GET home page.
 */

var commands = require("./lib/commands");
var simpleClient = require("./lib/client");

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//	res.send('Hello');
	var client = simpleClient(connection);
    client.call("getInfo", null, function (err, resp) {
//        cb(err, res);
    	if (err) {
    		console.log("Error in getblock");
    	} else {
    		console.log("Getting getblock");
    		res.json(resp);
    	}
    });
};
