var r = require('rethinkdbdash')();

// Receives a 'teacher' namespaced Socket connection from server.js
var prepareForLaunch = function(teacher){
	// Check to see if the users table needs to be created
	// If so, create table and seed with dummy users
	// Then, pass in the teacher socket to launchChangeFeed
	r.tableList().run().then(function(result){
		if (result.length > 0) {
			launchChangeFeed(teacher)
		} else {
			r.tableCreate('users').run().then(function(result){
				r.table('users').insert([
					{"assignment": "student", "needsHelp": false, "github":{"id": 1, "name": "Roz", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 2, "name": "Hunter", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 3, "name": "Ryan", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 4, "name": "Nadia", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}}
				]).run().then(function(){
					launchChangeFeed(teacher);
				})
			})
		}
	});
}

var launchChangeFeed = function(teacher){
	// Subscribes the server to a changefeed for all students
	r.table('users').filter({"assignment": "student"}).changes().run().then(function(result){
		console.log('Connected to Change Feed');
		result.each(function(err, row){
			// Emit an event to the teacher component when a student record has been updated
			teacher.emit('updateStudents', {data: row.new_val});
		});
	});
}

module.exports.prepareForLaunch = prepareForLaunch;