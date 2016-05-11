/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

// define the schema for our user model
var jobTransactionSchema = mongoose.Schema({
	seller			: String,
	sellerfirstname	: String,
	sellerlastname	: String,
	buyerfirstname	: String,
	buyerlastname	: String,
	buyer			: String,	
	title     		: String,
    description     : String,
    price      		: Number,
    date			: { type: Date }
});

// create the model for job transaction history
module.exports = mongoose.model('Jobtransactionhistory', jobTransactionSchema);
