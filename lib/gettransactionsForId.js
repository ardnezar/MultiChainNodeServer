
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
	var addr = req.user.local.address;
	var transactionId = req.param('txid')
	addr = addr.replace(/"/g, '');
	transactionId = transactionId.replace(/"/g, '');
	console.log("Address in listaddresstransactions:"+addr);

	if(!addr || addr.length <= 0 || !transactionId || transactionId.length <= 0) {
		console.log("Invalid address");
        res.send("Invalid address for getting transactions. Please try after some time.");
	} else {
		var arr = [];
		arr.push(addr);
		arr.push(transactionId)
	    client.connect(connection, "getaddresstransaction", 
    		arr, 
                  function (err, resp) {
		    	if (err) {
		    		console.log("Error in listaddresstransactions");
                    res.send("Error in listing transactions for the address "+addr);
		    	} else {
		    		console.log("Getting Transaction");
                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                    res.write(JSON.stringify(resp, 0, 4));
                    res.end();
		    	}
	    });
	}
};
