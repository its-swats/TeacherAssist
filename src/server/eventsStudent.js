var r = require('rethinkdbdash')();
var tokenHandler = require('./jwtauth.js')
var secret = require('../../secret.js')

module.exports = function(student){
  student.on('connection', function(socket){
    // Listen for a student 'help' event
    socket.on('help', function(data){
      // Verify that the user is legitimate by checking their JWT
      tokenHandler.verifyToken(data.token, function(token){
        // If legitimate, toggle needsHelp from true to false, and then emit that change back to the user
        // Teachers will also receive the change because of the changefeed subscription
        // Renews the user's JWT as well
      	r.table('users').get(token.id).update({needsHelp: r.row('needsHelp').not()}).run().then(function(res){     
      		r.table('users').get(token.id).run().then(function(res){
      			socket.emit('updateState', {action: 'needsHelp', value: res.needsHelp})
      			socket.emit('updateToken', tokenHandler.issueToken(res, secret.jwtKey))
      		})
      	})
      })
    });
  });
};
