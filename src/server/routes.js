var express = require('express');
var r = require('rethinkdbdash')();
var jwt = require('jwt-simple');


module.exports = function(app, passport, io) {
	// app.set('jwtTokenSecret', 'supersecret')
	app.get('/', function(req, res){
		res.sendFile(__dirname, 'index.html');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {session: false, scope: 'email'}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false, failureRedirect: '/'}), function(req, res, next){
		if (req.headers.referer == 'https://www.facebook.com/') {
			res.redirect('/', function(){
				io.emit('facebook', req.user)
			})
		} else {
			io.emit('facebook', req.user)
			res.status(204).end()
		}
	});

	app.get('/auth/github', passport.authenticate('github', {session: false, scope: 'email'}));

	app.get('/auth/github/callback', passport.authenticate('github', {session: false}), function(req, res, next){
		if (req.headers.referer == 'https://github.com/') {
			// console.log('hit')

			res.redirect('/')
		} else {
			console.log(req.user)
			var token = jwt.encode({
				exp: 5000000000,
				user: req.user
			}, app.get('jwtTokenSecret'))
			console.log(token)
			var token2 = jwt.decode(token, app.get('jwtTokenSecret'))
			console.log(token2)
			res.redirect('/?' + token)
			res.status(204).end()
		}
	});

	// app.get('/', function(req, res){
	// 	io.emit('facebook', req.user)
	// })
};

// router.get('/', function(req, res){
//  res.sendFile(__dirname, 'index.html')
// })

// module.exports = router