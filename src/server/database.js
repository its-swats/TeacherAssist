var r = require('rethinkdbdash')();
var tokenHandler = require('./jwtauth.js')

// Receives a 'teacher' namespaced Socket connection from server.js
var prepareForLaunch = function(socket){
	// Check to see if the users table needs to be created
	// If so, create table and seed with dummy users
	// Then, pass in the teacher socket to launchChangeFeed
	r.tableList().run().then(function(result){
		if (result.length > 0) {
			launchChangeFeed(socket)
		} else {
			r.tableCreate('users').run().then(function(result){
				r.table('users').insert([
					{"assignment": "student", "needsHelp": false, "github":{"id": 1, "name": "Roz", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 2, "name": "Hunter", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 3, "name": "Ryan", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}},
					{"assignment": "student", "needsHelp": false, "github":{"id": 4, "name": "Nadia", "picture":"https://avatars.githubusercontent.com/u/12677746", "profile": "http://www.google.com"}}
				]).run().then(function(){
					launchChangeFeed(socket);
				})
			})
		}
	});
}

var launchChangeFeed = function(socket){
	// Subscribes the server to a changefeed for all students
	r.table('users').filter({"assignment": "student"}).changes().run().then(function(result){
		console.log('Connected to Change Feed');
		result.each(function(err, row){
			// Emit an event to the teacher component when a student record has been updated
			socket.teacher.emit('updateStudents', {data: row.new_val});
			// Emit an event to the student to change the 'help' flag
			if (row.old_val.needsHelp == true && row.new_val.needsHelp == false){
				socket.student.emit('teacherSolved', {token: tokenHandler.issueToken(row.new_val), id: row.new_val.id})
			};
		});
	});
}

module.exports.prepareForLaunch = prepareForLaunch;