var secret = require('../../secret.js')

module.exports = {
	'facebookAuth': {
		'clientID'			: '702348803238668',
		'clientSecret'	: secret,
		'callbackURL'		: 'http://localhost:3000/auth/facebook/callback'
	}
}

console.log(secret)