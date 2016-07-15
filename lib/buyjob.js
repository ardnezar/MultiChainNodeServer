
/*
 * GET home page.
 */

var commands = require("../lib/commands");
var client = require("../lib/testclient");
var Jobpost = require('../models/jobpost');
var JobTransaction = require('../models/jobpurchasehistory');
var LeaderBoard = require('../models/leaderboard');
var User   = require('../models/user');
var jobpostListClient = require("../lib/getjoblistings");

var connection = {
	    port: 6460,
	    host: '127.0.0.1',
	    user: "test",
	    pass: "test"
	};

exports.buyjob = function(req, res){
	var username = req.user.local.username;
	
	var postId = req.param('id')
	var sellerUsername = req.param('sellerusername')
	var sellerAddress = req.param('seller')
	
	console.log("buyjob User:"+username);
	console.log("buyjob req id:"+postId);
	console.log("buyjob buyer address:"+req.user.local.address);
	console.log("buyjob seller address:"+sellerAddress);
	console.log("buyjob seller username:"+sellerUsername);
	var currentAddress = req.user.local.address;
//	var currentAddress = sellerUsername; 
//    currentAddress = "571174aa1063daf330fb4c3d";
//    sellerAddress = "571174aa1063daf330fb4c3c";
	if(sellerUsername === username) {
		console.log('buyjob..Buyer and seller address is same...deleting job');
		console.log('buyjob..req.url:'+req.url);
		console.log('buyjob..req.headers.referer:'+req.headers.referer);
		Jobpost.findById(postId, function (err, post){
			if(post) {
				post.remove(function(err){
//					if(err) {
//						jobpostListClient.internaljoblists(req, res, 1, 'Internal error in showing current job listings. Please try after some time.');
//					} else {
//						jobpostListClient.internaljoblists(req, res, 0, 'Job deleted Successfully.');						
//					}
//					res.render('accounts.ejs', {
//		                user : req.user, // get the user out of session and pass to template,
//		                message : '',
//		                flag : false
//		            });
					res.redirect(req.headers.referer);
				});
			} else {
				jobpostListClient.internaljoblists(req, res, 1, 'Job not present.');
			}
			
		});
	} else if(!sellerAddress || !currentAddress) {
		console.log('buyjob.1');
		jobpostListClient.internaljoblists(req, res, 1, 'Internal error in showing current job listings. Please try after some time.');
	} else {
		Jobpost.findById(postId, function (err, post){
			if(err || post == null) {
				console.log("buyjob..Job post doesn't exist with the given Id");
				//No post id exists
				jobpostListClient.internaljoblists(req, res, 1, 'Posting no longer available.');
			} else {
				//Valid post, we will do the processing here
				console.log("buyjob..Valid post:"+JSON.stringify(post));	
				
				var price = post.price;
				var provideService = false;
				
				//If price of the item is negative, then the user posting this job actually wants to pay for the job
				// so we just switch the users here				
				if(price < 0) {
					price = price * -1;
					console.log("Handling negative. username = " + username + " sellerUsername = " + sellerUsername);
					console.log("Handling negative. currentAddress = " + currentAddress + " sellerAddress = " + sellerAddress);
					var temp = currentAddress;
					currentAddress = sellerAddress;
					sellerAddress = temp;
					
					/*var tempUser = username;
					username = sellerUsername;
					sellerUsername = tempUser; */
					
					provideService = true;

					//console.log("After handling negative. username = " + username + " sellerUsername = " + sellerUsername + " tempUser = " + tempUser);
					console.log("After handling negative. currentAddress = " + currentAddress + " sellerAddress = " + sellerAddress + " temp = " + temp);	
				}
				
				//Get current users balance to check if he has enough balance to buy the job
				var client = require("../lib/getaddressbalance");
	            if(currentAddress) {
	            	console.log('buyjob..Valid address Extracting balance');
			        client.getaddressbalance(currentAddress, function (err, balance) {
			        	err = "";
			        	if(err) {
			        		jobpostListClient.internaljoblists(req, res, 1, 'Internal error in showing current job listings. Please try after some time.');
			        	} else {	        				        			
				    		//Check balance			        					        		            			
	            			console.log('Valid address Extracting balance:'+balance);
	            			if(balance >= price) {
	            				//Current user has enough money to order this job
	            				/*
	            				 * Following actions take palce here:
	            				 * 1. Transfer the amount from buyer to seller (Accounts get updated in the multichain)
	            				 * 2. Update buyer account (Balance updated to the db)
	            				 * 3. Update seller account (Balance updated to the db)
	            				 */
	            				
	            				var transferClient = require("../lib/transferasset");
	            				
	            				
	            				transferClient.transferInternal(currentAddress, sellerAddress, price, function (err, response) {
							console.log("Transfer asset response: " + response);
	            					if(err) {
	            						//Error in transferring dicoins for purchasing job
	            						jobpostListClient.internaljoblists(req, res, 1, 'Error in transferring dicoins for the job.');
	            						
	            					} else {
	            						post.remove(function(err){
	            							console.log('Removing post');
	            						});
	            						//var balance1 = balance - price;	 
	            						
	            						//Update buyer balance in user info
								console.log("Updainging buyer info. username = " + username);
	            						User.findOne({ 'local.username' :  username }, 
	            						          function(err, user) {
									console.log ("Balance before update = " + user.local.balance);
	            							if(!provideService) {
	            								user.local.balance = user.local.balance - price;
	            							} else {
	            								user.local.balance = user.local.balance + price;
	            							}
									
		        	            			console.log('After updating buyer balance:' + user.local.balance);
		        	            			user.save(function(err) {
		        	    	            		if (err) {
		        	    	            			console.log('error in updating user data');
		        	    	            		} else {
		        	    	            	        console.log('success in updating user data');
		        	            				}
		        	    	            		var msg = 'You bought the job successfully. Your currently have '+ user.local.balance + ' dicoins.';
		        	    	            		req.user = user;
			            						jobpostListClient.internaljoblists(req, res, 0, msg);
		        	    	        	    });
		        	            			
	            						});
	            						
	            						//Update seller balance in user info
	            						User.findOne({ 'local.username' :  sellerUsername }, 
	            						          function(err, selleruser) {			         
		            						//Update User data
	            							if(!provideService) {
	            								selleruser.local.balance = selleruser.local.balance + price;
	            							} else {
	            								selleruser.local.balance = selleruser.local.balance - price;
	            							}
	            								            								    	    					    	  
		        	            			console.log('Updating sellerUsername balance:'+balance);
		        	            			selleruser.save(function(err) {
		        	    	            		if (err) {
		        	    	            			console.log('error in updating user data');
		        	    	            		} else {
		        	    	            	        console.log('success in updating user data');
		        	            				}		        	    	            		
		        	    	        	    });
		        	            			var messageClient = require("../lib/sendMessageToSeller");
								if (provideService) {
    	            			            			messageClient.sendMessage(username + " have bought the job " + post.title + ". Your current balance is " + selleruser.local.balance + " LabCoins.", currentAddress);		        	            			
								} else {
    	            			            			messageClient.sendMessage("You have sold the job " + post.title + " to " + username + ". Your current balance is " + selleruser.local.balance + " dicoins.", sellerAddress);		        	            			
								}
	            						});
	        			       			
	        			       			
	            						
	            						//Save job transaction details
	            						var newJobTransaction = new JobTransaction();
	            						newJobTransaction.seller = post.username;
	            						newJobTransaction.buyer = username;
	            						newJobTransaction.title = post.title;
	            						newJobTransaction.description = post.description;
	            						if(!provideService) {
								  newJobTransaction.price = price;
								} else {
								  newJobTransaction.price = price * -1;
								} 

	            						newJobTransaction.txId = response;
	            						newJobTransaction.address = post.address;
	            						var now = new Date();		
	            						newJobTransaction.date = new Date(now.toUTCString());
            					    	            					    	            					    	            						          	    	            	          	    	     
	          	    	              // save the user
	            						newJobTransaction.save(function(err) {
	          	    		                if (err){
	          	    		                	console.log('Error in Saving user: '+err);  	          	    		                  
	          	    		                } else {
	          	    		                	console.log('Job transaction saved successfully');  	
	          	    		                }
	          	                		});
	            			            
	            			            
	            			            //Update buyer's and seller's leader board points
	            			            
	            						
	            						if(username !== 'dilabs@digitalinsight.com') {
		            			            //Update buyer leaderboard
		            			            LeaderBoard.findOne({ 'username' :  username }, 
		            			      	          function(err, buyer) {
		            			            			if(buyer) {
		            			            				if(!buyer.firstname) {
		            			            					User.findOne({ 'local.username' :  username }, 
			            			            						function(err, user) {	
				            			    		                if(user.local.lastname) {
				            			    		                	buyer.lastname = user.local.lastname;
			            			            					}
				            			    		                if(user.local.firstname) {
				            			    		                	buyer.firstname = user.local.firstname;
				            			    		                }
				            			    		                if(buyer.points) {
				            			            					buyer.points = buyer.points + price;
				            			            				} else {
				            			            					buyer.points = price;
				            			            				}
							            			            	buyer.save(function(err) {
						            		    	            		if (err)
						            		    	            			console.log('Update buyer leaderboard error')
						            		    	        			else
						            		    	            	        console.log('Update buyer leaderboard success')
						            		    	        	    });
			            			            				});
		            			            				} else {
			            			            				if(buyer.points) {
			            			            					buyer.points = buyer.points + price;
			            			            				} else {
			            			            					buyer.points = price;
			            			            				}
						            			            	buyer.save(function(err) {
					            		    	            		if (err)
					            		    	            			console.log('Update buyer leaderboard error')
					            		    	        			else
					            		    	            	        console.log('Update buyer leaderboard success')
					            		    	        	    });
		            			            				}
		            			            			} else {	            			            					            			            				            			            			
		            			            				User.findOne({ 'local.username' :  username }, 
		            			            						function(err, user) {	
		            			            					var newLeader = new LeaderBoard();
			            			    		                newLeader.username = user.local.username;
			            			    		                if(user.local.lastname) {
			            			    		                	newLeader.lastname = user.local.lastname;
		            			            					}
			            			    		                if(user.local.firstname) {
			            			    		                	newLeader.firstname = user.local.firstname;
			            			    		                }
			            			    		                newLeader.points = price;	            			    		                
			            			    		                newLeader.save(function(err) {
			            				    		                if (err){
			            				    		                  console.log('Error in Saving Leaderboard for Buyer: '+username);  	            				    		                  
			            				    		                } else {		    		                		    		                
			            				    		                	console.log('Leaderboard creation for Buyer: '+username);
			            				    		                }
			            				                		});
		            			            				});
		            			            				
		            			            			}
				      	          			});	            			            
	            						}
	            			            
	            			            if(sellerUsername !== 'dilabs@digitalinsight.com') {	            			            
		            			            //Update seller leaderboard
		            			            LeaderBoard.findOne({ 'username' :  sellerUsername }, 
		            			            		function(err, seller) {
				            			            	if(seller) {
				            			            		if(!seller.firstname) {
				            			            			User.findOne({ 'local.username' :  sellerUsername }, 
			            			            						function(err, user) {	
				            			    		                if(user.local.lastname) {
				            			    		                	seller.lastname = user.local.lastname;
			            			            					}
				            			    		                if(user.local.firstname) {
				            			    		                	seller.firstname = user.local.firstname;
				            			    		                }
				            			    		                if(seller.points) {
						            			            			seller.points = seller.points + price;
						            			            		} else {
						            			            			seller.points = price;
						            			            		}
							            			            	
							            			            	seller.save(function(err) {
						            		    	            		if (err)
						            		    	            			console.log('Update seller leaderboard error')
						            		    	        			else
						            		    	            	        console.log('Update seller leaderboard success')
						            		    	        	    });
			            			            				});
				            			            		} else {
					            			            		if(seller.points) {
					            			            			seller.points = seller.points + price;
					            			            		} else {
					            			            			seller.points = price;
					            			            		}
						            			            	
						            			            	seller.save(function(err) {
					            		    	            		if (err)
					            		    	            			console.log('Update seller leaderboard error')
					            		    	        			else
					            		    	            	        console.log('Update seller leaderboard success')
					            		    	        	    });
				            			            		}			            			            		
			        			            			} else {
			        			            				User.findOne({ 'local.username' :  sellerUsername }, 
		            			            						function(err, user) {	
		            			            					var newLeader = new LeaderBoard();
			            			    		                newLeader.username = user.local.username;
			            			    		                if(user.local.lastname) {
			            			    		                	newLeader.lastname = user.local.lastname;
		            			            					}
			            			    		                if(user.local.firstname) {
			            			    		                	newLeader.firstname = user.local.firstname;
			            			    		                }
			            			    		                newLeader.points = price;	            			    		                
			            			    		                newLeader.save(function(err) {
			            			    		                	if (err){
			            				    		                  console.log('Error in Saving Leaderboard for Seller: '+sellerUsername);  	            				    		                  
			            				    		                } else {		    		                		    		                
			            				    		                	console.log('Leaderboard creation for Seller: '+sellerUsername);
			            				    		                }
			            				                		});
		            			            				});
			        			            			}
		      	          					});
	            			            }
	            					}
	            					
	            				});		            					            					            				
	            			} else {
	            				Jobpost.find({},function(err, posts) {
	        						if(err) {
	        							res.render( 'joblistings', {
	        								messageType: 1,
	        								user : req.user,
	        								message: 'Internal error in showing current job listings. Please try after some time.' 			 
	        						    });
	        						} else {
	        							console.log('Job posts are present');  
	        							res.render( 'joblistings', 
	        							{
	        						      title : 'Jobs listings',
	        						      posts : posts,
	        						      messageType: 1,
	        						      user : req.user,
	        						      message:'Not enough balance to purchase the job.'
	        						    });
	        						}
	        					});
	            			}	            			
			        	}	       				       	
			    	});
	            } else {
	            	console.log('buyjob..Address not present');            	
	            	Jobpost.find({},function(err, posts) {
	    				if(err) {
	    					res.render( 'joblistings', {
	    						messageType: 1,
	    						user : req.user,
	    						message: 'Internal error in showing current job listings. Please try after some time.' 			 
	    				    });
	    				} else {
	    					console.log('Address not present..Job posts');  
	    					res.render( 'joblistings', 
	    					{
	    				      title : 'Jobs listings',
	    				      posts : posts,
	    				      messageType: 1,
	    				      user : req.user,
	    				      message:'Invalid current address.'
	    				    });
	    				}
	    			});
	            }
			}
			
		});
	}			
};
