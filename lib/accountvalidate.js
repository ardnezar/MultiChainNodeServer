
/*
 * GET home page.
 */


/*
 * grant 1AyBVouMPC17SLmh619LLPBkyRrQCM2ampEhfp send,receive
 * sendassetfrom 14dCm8z1CTprJMj4f6pdH2WSXbtrbVo2K8f1TT 1AyBVouMPC17SLmh619LLPBkyRrQCM2ampEhfp dicoins_v2 100
 * 
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');
var JobTransaction = require('../models/jobpurchasehistory');
var LeaderBoard = require('../models/leaderboard');
var User   = require('../models/user');
var grantPermissionClient = require("../lib/grantpermission");
var transferClient = require("../lib/transferasset");

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.validate = function(req, res){
	var currentAddress = '1ZtMD8tQHLB3NUdxeTJ594octT643DxxSm6Ld';
	var blockchainaddress = req.param('address')
	console.log("accountvalidate blockchainaddress address:"+blockchainaddress);
	grantPermissionClient.grantPermission(blockchainaddress, function (err, response) {
		if(err) {
	                console.log("1111accountvalidate blockchainaddress address:"+blockchainaddress);
			//Error in transferring dicoins for purchasing job
			res.send("ERR_1");
			
		} else {
			//If permissions have been granted successfully, transfer 100 labcoins to the newly validated multichain address
			transferClient.transferInternal(currentAddress, blockchainaddress, 100, function (err, response) {
				if(err) {
	                console.log("118879011accountvalidate blockchainaddress address:"+blockchainaddress);
					//Error in transferring dicoins for purchasing job
					res.send("ERR_2");
					
				} else {
	                console.log("17689111accountvalidate blockchainaddress address:"+blockchainaddress);
					res.send("NOERR");
				}
			});			
		}
	});
	
};
