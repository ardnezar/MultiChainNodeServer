/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

// define the schema for our user model
var jobTransactionSchema = mongoose.Schema({
	seller			: String,
	buyer			: String,	
	title     		: String,
    description     : String,
    price      		: Number,
    date			: { type: Date, default: Date.now }
});

// create the model for job transaction history
module.exports = mongoose.model('Jobtransactionhistory', jobTransactionSchema);
