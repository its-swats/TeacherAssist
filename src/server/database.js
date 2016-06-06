var r = require('rethinkdbdash')();

var prepareForLaunch = function(teacher){
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
	r.table('users').filter({"assignment": "student"}).changes().run().then(function(result){
		console.log('Connected to Change Feed');
		result.each(function(err, row){
			teacher.emit('updateStudents', {data: row.new_val});
		});
	});
}

module.exports.prepareForLaunch = prepareForLaunch;