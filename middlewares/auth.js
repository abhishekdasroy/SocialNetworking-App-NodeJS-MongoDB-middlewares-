var mongoose = require('mongoose');
var userModel = mongoose.model('User')


// app level middleware to set request user 

//to check legitimate user of the system
exports.setLoggedInUser = function(req,res,next){
//its checking whether this session and session.user exist or not
	if(req.session && req.session.user){

		userModel.findOne({'email':req.session.user.email},function(err,user){

			if(user){
	        //setting another variable here			
				//req.user = user;
				req.session.user = user;
				 //deleting the password
				delete req.user.password; 
	        		
				
				next();
			}
			else{
				// do nothing , because this is just to set the values
			}
		});
	}
	else{
		next();
	}


}//


exports.checkLogin = function(req,res,next){

	if(!req.session.user){

		//if the user doesn't exist ,just redirect him to logged in screen
		res.redirect('/users/login/screen');
	}
	else{
		
//if it exist then move forward
		next();
	}

}// end checkLogin