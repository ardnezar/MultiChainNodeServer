
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');

var connection = {
	    port: 4784,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.buyjob = function(req, res){
	var username = req.user.local.username;
//	var title = req.body.title;
//	var description = req.body.description;
//	var price = parseInt(req.body.price);
	
	
	
	
	console.log("buyjob User:"+username);
	console.log("buyjob req:"+JSON.stringify(req.header));
//	console.log("buyjob User full:"+req.user);
//	console.log("buyjob title:"+title);

	
//	if(!isNaN(price)) {    
//		var newPost = new Jobpost();
//		newPost.username = username;
//		newPost.title = title;
//		newPost.description = description;
//		newPost.price = price;
//	    
//		newPost.save(function(err) {
//	        if (err){
//	          console.log('Error in Saving Job Post: '+err);  
//	          return done(null, false, 
//	   	                 req.flash('jobpostMessage','Internal error in saving job post. Please try after some time.'));
//	        } else {		    		                		    		                
//	        	console.log('job post saved successfully');    
//	        	res.render('jobpost.ejs', 
//		    	{ 
//		    		message: 'New job successfully updated.', 			    		    	     		
//		    	});
//			}
//		});
//	} else {
//		res.render('jobpost.ejs', 
//    	{ 
//    		message: 'Price should be a number.', 			    		    	     		
//    	});
//	}
	
	Jobpost.find({},function(err, posts) {
		if(err) {
			res.render( 'joblistings', {
				message: 'Internal error in showing current job listings. Please try after some time.' 			 
		    });
		} else {
			console.log('Job posts: '+JSON.stringify(posts));  
			res.render( 'joblistings', 
			{
		      title : 'Jobs listings',
		      posts : posts,
		      message:'Test buy listings.'
		    });
		}
	});
};
