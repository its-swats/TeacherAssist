var secret = require('../../secret.js')

module.exports = {
	'facebookAuth': {
		'clientID'			: '702348803238668',
		'clientSecret'	    : secret.fbId,
		'callbackURL'		: 'http://localhost:3000/auth/facebook/callback'
	},
    'githubAuth': {
        'clientID'          : '9078c5924546759bdff3',
        'clientSecret'      : secret.githubId,
        'callbackURL'       : 'http://localhost:3000/auth/github/callback'
    }
}


