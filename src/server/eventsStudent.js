var r = require('rethinkdbdash')();
var tokenHandler = require('./jwtauth.js')
var secret = require('../../secret.js')

module.exports = function(student){
  student.on('connection', function(socket){
    socket.on('help', function(data){
      tokenHandler.verifyToken(data.token, function(token){
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
