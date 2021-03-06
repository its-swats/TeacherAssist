import React from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import io from 'socket.io-client';
import tokenHandler from './helpers/tokenHandling.js';
import TeacherPanel from './teachers.jsx';
import StudentPanel from './students.jsx';
import LoginForm from './loginForm.jsx';
import UserPane from './userPane.jsx';
import initialState from './helpers/user.js';
let socket; 

var App = React.createClass({
	getInitialState: function(){
		return({user: initialState});
	},
	componentDidMount: function(){
		// Check to see if JWT Token string exists in URL bar
		// If it does, save it to the localStorage and update the url
		if (window.location.search != "") {
			this.setToken(window.location.search.slice(1));
			history.pushState('', '', "http://" + window.location.hostname + ":" + window.location.port);
		}
		// If a token is saved, parse it and connect to the appropriate socket server
		if (!!window.localStorage.getItem('token')){
			let info = tokenHandler.getTokenPayload(window.localStorage.getItem('token'));
			socket = io("/"+info.assignment, {'sync disconnect on unload': true})
			this.setState({user: info})
			socket.on('updateState', this.updateState)
			socket.on('updateToken', this.setToken)
			socket.on('teacherSolved', this.teacherSolved)
			socket.on('test', this.test)
			// debugger;
		} 
	},
	test: function(data){
		console.log(data);
	},
	teacherSolved: function(data){
		// Switch button state when teacher resolves help request
		this.setState(update(this.state, {user: {$merge: {needsHelp: false}}}))
		this.setToken(data.token)
	},
	loggedIn: function() {
		return !!this.state.user.id
	},
	teacher: function() {
		return(<TeacherPanel socket={socket} />);
	},
	student: function() {
		return(<StudentPanel socket={socket} id={this.state.user.id} needsHelp={this.state.user.needsHelp} />);
	},
	logout: function(event) {
		// Delete token from local storage, and then re-render
		window.localStorage.removeItem('token')
		this.setState({user: initialState})
	},
	updateState: function(data){
		// Function to allow for dynamic state changes
		this.setState(update(this.state, {user: {$merge: {[data.action]: data.value}}}))
	},
	setToken: function(token){
		// Save token to local storage
		window.localStorage.setItem('token', token)
	},
	render: function() {
		return(
		<div className='jumbotron'>
			<div className='container'>
				{this.loggedIn() ? <UserPane info={this.state.user}/> : <p>Not logged in</p>}
				{this.loggedIn() ? (this.state.user.assignment == 'student' ? this.student() : this.teacher()) : <LoginForm />}
				{this.loggedIn() ? <button className='btn' onClick={this.logout}>Logout</button> : null}
			</div>
		</div>
		)
	}
})

render(<App />, document.getElementById('app'));