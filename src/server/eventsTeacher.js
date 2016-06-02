var r = require('rethinkdbdash')();

module.exports = function(io){
  var teacher = io.of('/teacher');

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
};


