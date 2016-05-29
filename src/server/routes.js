var express = require('express');
var r = require('rethinkdbdash')();



module.exports = function(app, passport,io) {

	app.get('/', function(req, res){
		res.sendFile(__dirname, 'index.html');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', function(a, b, c){
		io.emit('facebook', b)
	}));

};

// router.get('/', function(req, res){
//  res.sendFile(__dirname, 'index.html')
// })

// module.exports = router