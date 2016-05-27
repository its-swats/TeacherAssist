var express = require('express');
var app = express();
var r = require('rethinkdbdash')();
var server = app.listen(3000, function(){console.log('listening on :3000');})
var io = require('socket.io').listen(server);
var attachSocket = require('./src/server/eventEmitters.js')
var databaseSetup = require('./src/server/database.js');
var teacher = io.of('/teacher');
var student = io.of('/student');
var activeConnections = 0;

//Set up database and begin watching changefeed
databaseSetup.prepareForLaunch(function(row){
	//Action to perform on changefeed update
	teacher.emit('updateStudents', {id: row.new_val.id, needsHelp: row.new_val.needsHelp});
});
//Establish socket connection with clients
attachSocket(io, activeConnections);

//Middleware
app.use(express.static('src/client'));
app.use('/', require('./src/server/routes'))