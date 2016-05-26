var r = require('rethinkdbdash')();

r.tableCreate('students').run().then(function(result){
	r.table('students').insert([
		{"id": 1, name: "Shawn", needsHelp: false},
		{"id": 2, name: "Ryan", needsHelp: false},
		{"id": 3, name: "Hunter", needsHelp: false},
		{"id": 4, name: "Nadia", needsHelp: false}
		]).run()
})