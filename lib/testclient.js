var http = require("http");
var https = require("https");

module.exports = {
		connect : function(connection, method, params, cb) {
	     var options = {
	        host: connection.host,
	        port: connection.port,
	        method: "POST",
	        key: connection.key,
	        cert: connection.cert,
	        agent: connection.agent,
	        pfx: connection.pfx,
	        passphrase: connection.passphrase,
	        ca: connection.ca,
	        ciphers: connection.ciphers,
	        rejectUnauthorized: connection.rejectUnauthorized,
	        secureProtocol: connection.secureProtocol,
	        servername: connection.servername,
	        headers: {'Content-Type': 'application/json', host: connection.host}
	    };

	    if(connection.user && connection.pass){
	        options.auth = connection.user + ":" + connection.pass;
	    }

        console.log("method:"+method);
        console.log("host:"+options.host);
        console.log("port:"+options.port);
        console.log("options.auth:"+options.auth);
        	
        var payload = {method: method, params: [], id: 1, jsonrpc: '2.0'};
        if(params){
            console.log("Params:"+JSON.stringify(params))
            payload.params = params;
        } else {
            console.log("No params");
        }
        var body = JSON.stringify(payload);
        console.log("Request body:"+body);
        options.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
        console.log("Request options:"+JSON.stringify(options));
        if(connection.protocol === "https"){
            var req = https.request(options);
        } else {
            var req = http.request(options);
        }

        var data = "";

        req.on('error', (e) => {
            console.log("req error..e:"+e);
            cb(e);
        });

        req.write(JSON.stringify(payload));
        req.on("response", (res) => {

            res.on('data', (chunk) => {
                data += chunk;
            })
            res.on('end', () => {
                var response;
                console.log("res code:"+res.statusCode);
                if(res.statusCode === 200){

                    response = JSON.parse(data);
                    return cb(null, response.result);

                } else if (res.headers['content-type'] === "application/json"){

                    response = JSON.parse(data);
                    return cb(response.error);

                } else {

                    return cb(data);

                }
            })
        })
        req.end();
    },
    
    getParams : function (args) {
    	var params;
        var userParams = [];
        
        if (args instanceof Object && !(args instanceof Array) && !(args instanceof Function)) {
        	console.log("Check params1");
/*	        for(var arg in commandParams){
	
	            if(typeof arg === "string") {
	
	                userParams.push(args[arg]);
	
	            } else if (typeof arg === "object") {
	
	                var key = Object.keys(arg)[0];
	                var defaultVal = arg[key];
	
	                if(typeof args[key] !== "undefined") {
	
	                    userParams.push(args[key]);
	
	                } else {
	
	                    userParams.push(defaultVal);
	
	                }
	            }
	        }*/
	        params = args;
        } else if (args instanceof Array || args === null || args === undefined) {
        	console.log("Check params2..args:"+args);
        	params = args;
        }
        return params;
    }

};
