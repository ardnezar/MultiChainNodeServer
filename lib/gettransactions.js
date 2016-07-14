
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

exports.gettransactions = function(req, res){
	var headers = req.headers;
	var addr = req.user.local.address;
	addr = addr.replace(/"/g, ''); 
	console.log("Address in listaddresstransactions:"+addr);
	var arr = [];
	arr.push(addr);
	if(!addr || addr.length <= 0) {
		console.log("Invalid address");
        res.send("Invalid address for getting transactions. Please try after some time.");
	} else {
	    client.connect(connection, "listaddresstransactions", 
	    		arr, 
	                  function (err, resp) {
			    	if (err) {
			    		console.log("Error in listaddresstransactions");
		                        res.send("Error in listing transactions for the address "+addr);
			    	} else {
			    		console.log("Getting getblock");
                                        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
 	                                res.write(JSON.stringify(resp, 0, 4));
 	                                res.end();
			    	}
	    });
	}
};
