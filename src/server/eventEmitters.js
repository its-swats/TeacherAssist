var r = require('rethinkdbdash')();

var attachSocket = function(io, activeConnections){
  var teacher = io.of('/teacher');
  var student = io.of('/student');

  teacher.on('connection', function(socket){
    console.log('A teacher connected')
    r.table('students').run().then(function(result){
      teacher.emit('updateStudents', result);
    });
    socket.on('solved', function(msg){
      r.table('students').get(parseInt(msg)).update({needsHelp: false}).run().then(function(res){
        console.log('Student Flag Updated to False')
      });
    });
  });

  student.on('connection', function(socket){
    console.log('A student connected')
    socket.on('help', function(msg){
      r.table('students').get(parseInt(msg)).update({needsHelp: true}).run().then(function(res){
        console.log('Student Flag Updated True')
      });
    });
  });
};


module.exports = attachSocket;