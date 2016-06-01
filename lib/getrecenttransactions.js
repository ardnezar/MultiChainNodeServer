
/*
 * GET Job sales history
 */

var JobTransaction = require('../models/jobpurchasehistory');

exports.gettransactions = function(req, res){
	console.log('gettransactions');  
	JobTransaction.find()
	.sort("-date")
	.exec(function(err, posts) {
		if(err) {
			res.render( 'recenttransactions', {
				message: 'Internal error in showing job purchase listings. Please try after some time.' 			 
		    });
		} else if(Object.keys(posts).length > 0) {
			console.log('Job posts: '+JSON.stringify(posts));  
//			res.render( 'recenttransactions', 
//			{
//		      title : 'Jobs listings',
//		      posts : posts,
//		      message:""
//		    });
			res.write(JSON.stringify(posts));
			res.end();
		} else {
			res.render('accounts.ejs', {
            	message: 'There is no recent transaction',
                user : req.user // get the user out of session and pass to template            
            });
		}
	});
    
};