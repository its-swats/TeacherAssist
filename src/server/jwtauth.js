var jwt = require ('jwt-simple')
var secret = require('../../secret.js');

module.exports = {
	issueToken: function(payload, key){
		return jwt.encode(payload, key);
	},

	verifyToken: function(token, callback){
		try { 
			var decoded = jwt.decode(token, secret.jwtKey);
				callback(decoded)
		} catch (err) {
				return err;
		};
	}
}