var jwt = require ('jwt-simple')
var secret = require('../../secret.js');

module.exports = {
	issueToken: function(payload, key){
		// Creates a JWT using the payload and secret key
		return jwt.encode(payload, key);
	},

	verifyToken: function(token, callback){
		// Attempts to decode the provided token using secret key
		// It if succeeds, run the callback on the decoded JWT
		try { 
			var decoded = jwt.decode(token, secret.jwtKey);
				callback(decoded)
		} catch (err) {
				return err;
		};
	}
}