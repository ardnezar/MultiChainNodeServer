
/*
 * GET home page.
 */


/*
 * grant 1AyBVouMPC17SLmh619LLPBkyRrQCM2ampEhfp send,receive
 * sendassetfrom 14dCm8z1CTprJMj4f6pdH2WSXbtrbVo2K8f1TT 1AyBVouMPC17SLmh619LLPBkyRrQCM2ampEhfp dicoins_v2 100
 * 
 */

var connection = {
	    port: 4784,
	    host: '159.203.228.117',
	    user: "test",
	    pass: "test"
	};



module.exports = {
		validate : function(blockchainaddress, cb){
			var currentAddress = '14dCm8z1CTprJMj4f6pdH2WSXbtrbVo2K8f1TT';
			console.log("accountvalidate blockchainaddress address:"+blockchainaddress);		
			var http = require('http');		
			
			var requestPath = '/validate/?address='+blockchainaddress;
			var options = {
			  host: connection.host,
			  path: requestPath
			};
		
			callback = function(response) {
			  var str = '';
		
			  //another chunk of data has been recieved, so append it to `str`
			  response.on('data', function (chunk) {
			    str += chunk;
			  });
		
			  //the whole response has been recieved, so we just print it out here
			  response.on('end', function () {
			    console.log("AccountValidate...response end:"+str);
				    if(str === 'NOERR') {
				    	console.log("AccountValidate...NOERR");
				    	cb(null, null);
				    } else {
				    	console.log("AccountValidate...ERR");
				    	cb(str, null);
				    }
			  });
			}
		
			http.request(options, callback).end();
		}	
};
