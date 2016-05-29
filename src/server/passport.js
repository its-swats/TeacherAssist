var r = require('rethinkdbdash')();
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('./user')

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		r.table('users').get(id).run().then(function(result){
			done(null, result);
		});
	});

	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			r.table('users').filter({'facebook': {'id': profile.id}}).run().then(function(result){
				if (result.length > 0){
					return done(null, result[0]);
				} else {
					var newUser = new User()
					newUser.facebook.id = profile.id
					newUser.facebook.token = token;
					newUser.facebook.name = profile.displayName;
					r.table('users').insert(newUser).run().then(function(result){
						newUser.id = result.generated_keys[0]
						return done(null, newUser)
					})
				}
			})
		})
	}
	));

}