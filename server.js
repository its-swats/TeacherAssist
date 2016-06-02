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
// var bodyParser = require('body-parser');
var morgan = require('morgan');
var secret = require('./secret.js')

//Middleware
app.use(express.static('src/client'));
app.use(morgan('dev'));
// app.use(bodyParser());
app.use(passport.initialize());
app.set('jwtTokenSecret', secret.jwtKey)

//Set up Passport and Routes
require('./src/server/passport')(passport);
require('./src/server/routes.js')(app,passport,io)


//Set up database and begin watching changefeed
databaseSetup.prepareForLaunch()

//Establish socket connection with clients
attachSocket(io);


