var jwt = require ('jwt-simple')
var secret = require('../../secret.js');

module.exports = {
	issueToken: function(payload, key){
		return jwt.encode(payload, key);
	},

	verifyToken: function(token){
		try { 
			var decoded = jwt.decode(token, secret.jwtKey);
				return "Key checks out"
		} catch (err) {
				return "Key doesn't check out"
		}
	}
}