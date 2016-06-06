var r = require('rethinkdbdash')();

module.exports = function(teacher){
  teacher.on('connection', function(socket){
    console.log('A teacher connected')
    r.table('users').filter({assignment: 'student'}).run().then(function(result){
      teacher.emit('updateStudents', result);
    });

    socket.on('solved', function(msg){
      r.table('users').get(msg).update({needsHelp: false}).run().then(function(res){
        console.log('Student Flag Updated to False')
      });
    });
  });
};


