/**
 * http://usejsdoc.org/
 */
//var info = require('./routes/getinfo')

module.exports = function(app, passport) {
	
	
	// =====================================
    // ACCOUNT SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
	
	var getAccounts = require('../lib/getAccountInfo')	
	
    app.get('/accounts', isLoggedIn, getAccounts.getaccountinfo);
	
	var getDetailedAccounts = require('../lib/getDetailedAccountInfo')	
	
    app.get('/detailedaccount', isLoggedIn, getDetailedAccounts.getaccountinfo);    		    	

    // =====================================
    // Get transactions ========
    // =====================================
    
    var gettrans = require('../lib/gettransactions')

    app.get('/transactions', isLoggedIn, gettrans.gettransactions);
    
    //Show activity feed
    var getrecent = require('../lib/getrecenttransactions')

    app.get('/recent', getrecent.gettransactions);
    
    
    //Show leaderboard
    var getleader = require('../lib/getleaderboard')

    app.get('/leaderboard', isLoggedIn, getleader.getleadboardlist);

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
    	var now = new Date();
		var nowUtc = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
		console.log('local date:'+nowUtc);
		console.log('local dat1:'+new Date(now.toUTCString()));
    	res.render('index', { message: req.flash('message') });
//    	res.send('Hello World\n');
    });
    
    app.get('/failure', function(req, res) {
//    	res.render('index', { message: req.flash('message') });
    	res.send('Bad Login\n');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
    	successRedirect: '/listjobpost',
        failureRedirect: '/login',
        failureFlash : true 
    }));
    
//    var transferClient = require("../lib/transferasset");
    
//    app.post('/transfer', transferClient.transfer);
    
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });
    
    
    
    /*
     * Get all job listings
     */
    
    var jobpostListClient = require("../lib/getjoblistings");

    // show the post form
    app.get('/listjobpost', isLoggedIn, jobpostListClient.joblists);
    
    /*
     * Get job listings for the current user
     */    
    var jobpostListCurrentuserClient = require("../lib/getjobposthistory");
    app.get('/listcurrentjobpost', isLoggedIn, jobpostListCurrentuserClient.jobPostlists);
    
    /*
     * Get Job purchase history
     */
    
    var jobPurchaseHistoryClient = require("../lib/getjobpurchasehistory");

    app.get('/listjobpurchasehistory', isLoggedIn, jobPurchaseHistoryClient.jobPurchaselists);
    
    /*
     * Get Job Sales history
     */
    
    var jobSalesHistoryClient = require("../lib/getjobsaleshistory");

    app.get('/listjobsaleshistory', isLoggedIn, jobSalesHistoryClient.jobSaleslists);
        
    // show the login form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') }); 
    });
    
    // show the transfer form
    app.get('/transfer', isLoggedIn, function(req, res) {
        // render the page and pass in any flash data if it exists
    	console.log("Username..transfer:"+req.user);
    	console.log("Get headers:"+JSON.stringify(req.headers));
        res.render('transfer', 
        	{ 
        		message: 'Hello Transfer Test',
        		from: ''
        	    		
        	}); 
    });
    
    var buyJobClient = require("../lib/buyjob");
    
    app.post('/buyjob', isLoggedIn, buyJobClient.buyjob);
    
    
    var jobpostClient = require("../lib/createnewjobpost");
    
    app.post('/jobpost', isLoggedIn, jobpostClient.jobpost);

    // show the post form
    app.get('/jobpost', isLoggedIn, function(req, res) {
        // render the page and pass in any flash data if it exists
    	console.log("Username..jobpost:"+req.user);
    	console.log("Get headers:"+JSON.stringify(req.headers));
        res.render('jobpost', 
        	{ 
        		message: '',
        		from: ''
        	    		
        	}); 
    });
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/accounts', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
//    app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
//        res.redirect('/');
//    });
        
    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
//    app.get('/profile', isLoggedIn, function(req, res) {
//        res.render('profile.ejs', {
//            user : req.user // get the user out of session and pass to template
//        });
//    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}