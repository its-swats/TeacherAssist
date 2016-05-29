var express = require('express');
var r = require('rethinkdbdash')();



module.exports = function(app, passport,io) {

	app.get('/', function(req, res){
		res.sendFile(__dirname, 'index.html');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res, next){
		if (req.headers.referer == 'https://www.facebook.com/') {
			res.redirect('/', function(){
				io.emit('facebook', req.user)
			})
		} else {
			io.emit('facebook', req.user)
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