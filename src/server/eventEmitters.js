var r = require('rethinkdbdash')();

var attachSocket = function(io, activeConnections){
  var teacher = io.of('/teacher');
  var student = io.of('/student');

  teacher.on('connection', function(socket){
    console.log('A teacher connected')
    r.table('students').run().then(function(result){
      console.log('hit')
      teacher.emit('updateStudents', result);
    });
  });

  student.on('connection', function(socket){
    console.log('A student connected')
  })

  //Increases active connections and emits initial state data to client
  // var initializeClient = function(socket, id){
  //   activeConnections += 1
  //   socket.join(id)
  //   // io.emit('updateClient', {action: 'connectionCount', value: activeConnections})   
  //   // r.table('likes').get(1).run().then(function(result){
  //     // io.to(socket.id).emit('updateClient', {action: 'likesCount', value: result.likeCount})
  //   // });    
  // };

  // io.on('connection', function(socket){



  //   //Calls initialize state method for each client that connects
  //   // initializeClient(socket, socket.id)


  //   //Increments 'like' count, triggering changefeed
  //   socket.on('like', function(){
  //     r.table('likes').get(1).update({
  //       likeCount: r.row("likeCount").add(1)
  //     }).run();
  //   });

  //   //Decrement active users and update clients on disconnection
  //   // socket.on('disconnect', function(){
  //   //   activeConnections -= 1;
  //   //   io.emit('updateClient', {action: 'connectionCount', 'value': activeConnections});
  //   // });

  //   socket.on('toggleHelp', function(message, flag){
  //     console.log(message)
  //     io.emit('updateList', {action: 'students', value: {studentName: message, data: !flag}})
  //   });
  // });
};



module.exports = attachSocket;