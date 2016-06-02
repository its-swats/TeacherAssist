var express = require('express');
var jwt = require('jwt-simple');
var app = express();
var r = require('rethinkdbdash')();
var server = app.listen(3000, function(){console.log('listening on :3000');})
var io = require('socket.io').listen(server);
var attachSocket = require('./src/server/eventEmitters.js')
var databaseSetup = require('./src/server/database.js');
var teacher = io.of('/teacher');
var student = io.of('/student');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash = require('connect-flash');

require('./src/server/passport')(passport);
app.set('jwtTokenSecret', 'supersecret')
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({secret: 'secrets'}));
app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
require('./src/server/routes.js')(app,passport,io)


//Set up database and begin watching changefeed
databaseSetup.prepareForLaunch(function(row){
	//Action to perform on changefeed update
	teacher.emit('updateStudents', {id: row.new_val.id, needsHelp: row.new_val.needsHelp});
});
//Establish socket connection with clients
attachSocket(io);

//Middleware
app.use(express.static('src/client'));
// app.use('/', require('./src/server/routes'))
