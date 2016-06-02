var r = require('rethinkdbdash')();

module.exports = function(io){
  var student = io.of('/student');

  student.on('connection', function(socket){
    console.log('A student connected')
    socket.on('help', function(msg){
      r.table('students').get(parseInt(msg)).update({needsHelp: true}).run().then(function(res){
        console.log('Student Flag Updated True')
      });
    });
  });
};
