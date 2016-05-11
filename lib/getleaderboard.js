
/*
 * GET Job sales history
 */

var Leaderboard = require('../models/leaderboard');

exports.getleaderboard = function(req, res){
	console.log('getLeaderBoard');  
	Leaderboard.find({},function(err, leaders) {
		if(err) {
			res.render( 'leaderboard', {
				message: 'Internal error in showing job purchase listings. Please try after some time.' 			 
		    });
		} else if(Object.keys(leaders).length > 0) {
			console.log('Job posts: '+JSON.stringify(leaders));  
			res.render( 'leaderboard', 
			{
		      title : 'Jobs listings',
		      leaders : leaders,
		      message:""
		    });
		} else {
			res.render('accounts.ejs', {
            	message: 'Internal Error',
                user : req.user // get the user out of session and pass to template            
            });
		}
	});
    
};