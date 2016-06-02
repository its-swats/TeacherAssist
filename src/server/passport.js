var r = require('rethinkdbdash')();
var GithubStrategy = require('passport-github2').Strategy;
var configAuth = require('./auth');
var User = require('./user')

module.exports = function(passport){
	passport.use(new GithubStrategy({
	  clientID: configAuth.githubAuth.clientID,
	  clientSecret: configAuth.githubAuth.clientSecret,
	  callbackURL: configAuth.githubAuth.callbackURL
	}, 
	function(token, refreshToken, profile, done){
	  process.nextTick(function(){
	  	r.table('users').filter({'github': {'id': profile.id}}).run().then(function(result){
	  		if (result.length > 0){
	  			return done(null, result[0]);
	  		} else {
	  			var newUser = new User(profile, token)
	  			r.table('users').insert(newUser).run().then(function(result){
	  				newUser.id = result.generated_keys[0]
	  				return done(null, newUser)
	  			})
	  		}
	  	})
	  })
	}));

}