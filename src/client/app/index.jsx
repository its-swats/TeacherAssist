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
		if (window.location.search != "") {
			this.setToken(window.location.search.slice(1));
			history.pushState('', '', "http://" + window.location.hostname + ":" + window.location.port);
		}
		if (!!window.localStorage.getItem('token')){
			let info = tokenHandler.getTokenPayload(window.localStorage.getItem('token'));
			socket = io("/"+info.assignment)
			this.setState({user: info})
			socket.on('updateState', this.updateState)
			socket.on('updateToken', this.setToken)
		} 
	},
	loggedIn: function() {
		return !!this.state.user.id
	},
	teacher: function() {
		return(<TeacherPanel socket={socket} />);
	},
	student: function() {
		return(<StudentPanel socket={socket} needsHelp={this.state.user.needsHelp} />);
	},
	logout: function(event) {
		window.localStorage.removeItem('token')
		this.setState({user: initialState})
	},
	updateState: function(data){
		this.setState(update(this.state, {user: {$merge: {[data.action]: data.value}}}))
	},
	setToken: function(token){
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