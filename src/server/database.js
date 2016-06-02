var r = require('rethinkdbdash')();

var prepareForLaunch = function(){
	r.tableList().run().then(function(result){
		
		if (result.length > 0) {
			launchChangeFeed()
		} else {
			r.tableCreate('users').run()
			r.tableCreate('students').run().then(function(result){
				r.table('students').insert([
					{"id": 1, name: "Shawn", needsHelp: false},
					{"id": 2, name: "Ryan", needsHelp: false},
					{"id": 3, name: "Hunter", needsHelp: false},
					{"id": 4, name: "Nadia", needsHelp: false},
					{"id": 5, name: "Roz", needsHelp: false},
					{"id": 6, name: "Eunice", needsHelp: false}
					]).run().then(function(){
						launchChangeFeed();
					});
			});
		}
	});
}

var launchChangeFeed = function(){
	r.table('students').changes().run().then(function(result){
		console.log('Connected to Change Feed');
		result.each(function(err, row){
			teacher.emit('updateStudents', {id: row.new_val.id, needsHelp: row.new_val.needsHelp});
		});
	});
}

module.exports.prepareForLaunch = prepareForLaunch;