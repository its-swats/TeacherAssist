var express = require('express');
var app = express();
var r = require('rethinkdbdash')();
var server = app.listen(3000, function(){console.log('listening on :3000');})
var io = require('socket.io').listen(server);
var studentEvents = require('./src/server/eventsStudent.js')
var teacherEvents = require('./src/server/eventsTeacher.js')
var databaseSetup = require('./src/server/database.js');
var passport = require('passport');
var morgan = require('morgan');
var secret = require('./secret.js')

// Open socket connections for teachers and students
var teacherSocket = io.of('/teacher');
var studentSocket = io.of('/student');

//Middleware
app.use(express.static('src/client'));
app.use(morgan('dev'));
app.use(passport.initialize());
app.set('jwtTokenSecret', secret.jwtKey)

//Set up Passport and Routes
require('./src/server/passport')(passport);
require('./src/server/routes.js')(app,passport,io);


//Set up database and begin watching changefeed
databaseSetup.prepareForLaunch({teacher: teacherSocket, student: studentSocket});

//Open listen events
studentEvents(studentSocket);
teacherEvents(teacherSocket);

