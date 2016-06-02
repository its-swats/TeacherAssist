var express = require('express');
var tokenHandler = require('./jwtauth.js')

module.exports = function(app, passport, io) {
	app.get('/', function(req, res){
		res.sendFile(__dirname, 'index.html');
	});

	app.get('/auth/github', passport.authenticate('github', {session: false, scope: 'email'}));

	app.get('/auth/github/callback', passport.authenticate('github', {session: false}), function(req, res, next){
		if (req.headers.referer == 'https://github.com/') {
			res.redirect('/')
		} else {
			var token = tokenHandler.issueToken(req.user, app.get('jwtTokenSecret'))
			res.redirect('/?' + token)
		}
	});
};