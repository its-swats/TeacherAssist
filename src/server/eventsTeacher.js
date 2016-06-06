var r = require('rethinkdbdash')();

module.exports = function(teacher){
  teacher.on('connection', function(socket){
    console.log('A teacher connected')
    // When a teacher connects, emit a list of all students
    r.table('users').filter({assignment: 'student'}).run().then(function(result){
      teacher.emit('updateStudents', result);
    });

    socket.on('solved', function(msg){
      // When a teacher marks a student as solved, update database
      r.table('users').get(msg).update({needsHelp: false}).run().then(function(res){
        console.log('Student Flag Updated to False')
      });
    });
  });
};


