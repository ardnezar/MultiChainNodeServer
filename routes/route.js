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
	
	var accountValidate = require('../lib/accountvalidate')	
	
    app.get('/validate', isLoggedIn, accountValidate.validate);	

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

//    // if user is authenticated in the session, carry on 
//    if (req.isAuthenticated())
//        return next();
//
//    // if they aren't redirect them to the home page
//    res.redirect('/');
	return next();
}