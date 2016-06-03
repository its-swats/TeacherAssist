var User = function(profile, token) {
	this.assignment = 'student';
	this.needsHelp = false;
	this.github = {
        id: profile.id,
        token: token,
        name: profile.displayName,
        profile: profile._json.html_url,
        picture: profile._json.avatar_url.substring(0, profile._json.avatar_url.length - 4)
    }
    
}

module.exports = User
