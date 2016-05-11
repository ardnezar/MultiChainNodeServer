/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

// define the schema for our user model
var leaderboardSchema = mongoose.Schema({
	username     : String,
	firstname    : String,
	lastname     : String,
    points       : Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Leaderboard', leaderboardSchema);
