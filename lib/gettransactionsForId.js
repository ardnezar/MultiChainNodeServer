
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var JobTransaction = require('../models/jobpurchasehistory');

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.gettransactions = function(req, res){
	var headers = req.headers;
	var transactionId = req.param('id');
	console.log("GetTransaction for transactionId:"+transactionId);

	if(!transactionId || transactionId.length <= 0) {
		console.log("Invalid address");
        res.send("Invalid address for getting transactions. Please try after some time.");
	} else {		
		JobTransaction.findById(transactionId, function (err, transaction){
			if(transaction) {
				var arr = [];
				var transId = transaction.txId;				
				if(!transId || transId.length <= 0) {
					console.log("Invalid address");
			        res.send("Invalid address for getting transactions. Please try after some time.");
				} else {
					transId = transId.replace(/"/g, '');
					arr.push(transId)
					arr.push(1);
				    client.connect(connection, "getrawtransaction", 
			    		arr, 
			    		function (err, resp) {
					    	if (err) {
					    		console.log("Error in listaddresstransactions");
			                    res.send("Error in listing transactions for the txId "+transId);
					    	} else {
					    		console.log("Getting Transaction");
			                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
			                    res.write(JSON.stringify(resp, 0, 4));
			                    res.end();
					    	}
				    });
				}
			} else {
				console.log("Error in listaddresstransactions");
                res.send("Error in listing transactions for the address "+addr);
			}
			
		});
		
	}
};
