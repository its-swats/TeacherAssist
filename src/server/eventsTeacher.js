var r = require('rethinkdbdash')();
var tokenHandler = require('./jwtauth.js')

module.exports = function(teacher){
  teacher.on('connection', function(socket){
    console.log('A teacher connected')
    // When a teacher connects, emit a list of all students
    r.table('users').filter({assignment: 'student'}).run().then(function(result){
      teacher.emit('updateStudents', result);
    });

    socket.on('solved', function(data){
      // When a teacher marks a student as solved, update database after checking jwt
      tokenHandler.verifyToken(data.token, function(token){
        r.table('users').get(data.id).update({needsHelp: false}).run().then(function(res){
          console.log('Student Flag Updated to False')
        });
      });
    });
  });
};


