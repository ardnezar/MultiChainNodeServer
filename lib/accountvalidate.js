
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
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.validate = function(req, res){
	var currentAddress = '14dCm8z1CTprJMj4f6pdH2WSXbtrbVo2K8f1TT';
	var blockchainaddress = req.param('address')
	console.log("accountvalidate blockchainaddress address:"+blockchainaddress);
	grantPermissionClient.grantPermission(blockchainaddress, function (err, response) {
		if(err) {
			//Error in transferring dicoins for purchasing job
			res.send("ERR_1");
			
		} else {
			//If permissions have been granted successfully, transfer 100 labcoins to the newly validated multichain address
			transferClient.transferInternal(currentAddress, blockchainaddress, price, function (err, response) {
				if(err) {
					//Error in transferring dicoins for purchasing job
					res.send("ERR_2");
					
				} else {
					res.send("NOERR");
				}
			});			
		}
	});
	
};
