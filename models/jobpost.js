/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
	username		: String,
	address			: String,
	title     		: String,
    description     : String,
    price      		: Number,
    postedOn		: { type: Date, default: Date.now }
});

// create the model for posts and expose it to our app
module.exports = mongoose.model('Jobpost', userSchema);
