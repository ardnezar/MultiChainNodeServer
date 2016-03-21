
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

exports.gettransactions = function(req, res){
	var headers = req.headers;
	var addr = headers['address'];
			    		console.log("Address in listaddresstransactions:"+addr);
	var arr = [];
	arr.push(addr);
    client.connect(connection, "listaddresstransactions", 
    		arr, 
                  function (err, resp) {
		    	if (err) {
		    		console.log("Error in listaddresstransactions");
		                res.send("Error in listaddresstransactions..code\n");
		    	} else {
		    		console.log("Getting getblock");
		    		res.json(resp);
		    	}
    });
};
