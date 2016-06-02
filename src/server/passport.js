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
		console.log(token)
	  process.nextTick(function(){
	  	r.table('users').filter({'github': {'id': profile.id}}).run().then(function(result){
	  		if (result.length > 0){
	  			console.log('here')
	  			return done(null, result[0]);
	  		} else {
	  			var newUser = new User()
	  			newUser.github.id = profile.id
	  			newUser.github.token = token;
	  			newUser.github.name = profile.displayName;
	  			newUser.github.profile = profile._json.html_url
	  			newUser.github.picture = profile._json.avatar_url
	  			r.table('users').insert(newUser).run().then(function(result){
	  				newUser.id = result.generated_keys[0]
	  				return done(null, newUser)
	  			})
	  		}
	  	})
	  })
	}));

}