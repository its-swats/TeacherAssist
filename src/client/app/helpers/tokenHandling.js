module.exports = {
	parseToken: function(token){
		return token.split('.')[1]
	},

	getTokenPayload: function(token){
		return JSON.parse(atob(token));
	}
}