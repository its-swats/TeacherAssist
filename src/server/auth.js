var secret = require('../../secret.js')

module.exports = {
	'githubAuth': {
		'clientID'          : '9078c5924546759bdff3',
		'clientSecret'      : secret.githubId,
		'callbackURL'       : 'http://localhost:3000/auth/github/callback'
	}
}


