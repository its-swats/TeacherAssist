module.exports = {
	// Retrieves and decode JWT, returns JSON with values
	getTokenPayload: function(token){
		return JSON.parse(atob(token.split('.')[1]));
	}
}