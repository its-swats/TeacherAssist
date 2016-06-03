import React from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import io from 'socket.io-client';
import tokenHandler from './helpers/tokenHandling.js';
import TeacherPanel from './teachers.jsx';
import StudentPanel from './students.jsx';
import LoginForm from './loginForm.jsx';
import initialState from './helpers/user.js';

var App = React.createClass({
	getInitialState: function(){
		return({user: initialState});
	},
	getDefaultProps: function(){
		if (!!window.localStorage.getItem('token')){
			var info = tokenHandler.getTokenPayload(window.localStorage.getItem('token'));
			return({socket: io("/"+info.assignment)})
		} 
	},
	loggedIn: function() {
		return !!this.state.user.id
	},
	userPane: function() {
		return(
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<img src={this.state.user.github.picture}></img>
					<p>{this.state.user.github.name}</p>
					<p>{this.state.user.assignment}</p>
				</div>
			</div>
		)
	},
	teacher: function() {
		return(<TeacherPanel socket={io('/teacher')} />);
	},
	student: function() {
		return(<StudentPanel socket={this.props.socket} needsHelp={this.state.user.needsHelp} />);
	},
	logout: function(event) {
		window.localStorage.removeItem('token')
		this.setState({user: initialState})
	},
	componentDidMount: function(){
		if (window.location.search != "") {
			this.setToken(window.location.search.slice(1));
			history.pushState('', '', "http://" + window.location.hostname + ":" + window.location.port);
		}
		if (!!window.localStorage.getItem('token')){
			var info = tokenHandler.getTokenPayload(window.localStorage.getItem('token'));
			this.setState({user: info})
		} 
	},
	componentWillReceiveProps: function(){
			this.props.socket.on('updateState', this.updateState)
			this.props.socket.on('updateToken', this.setToken)
	},
	updateState: function(data){
		console.log('there')
		this.setState(update(this.state, {user: {$merge: {[data.action]: data.value}}}))
	},
	setToken: function(token){
		window.localStorage.setItem('token', token)
	},
	openSocketConnections: function(){

	},
	render: function() {
		return(
		<div className='jumbotron'>
			<div className='container'>
				{this.loggedIn() ? (this.state.user.assignment == 'student' ? this.student() : this.teacher()) : <LoginForm />}
				{this.loggedIn() ? <button className='btn' onClick={this.logout}>Logout</button> : null}
			</div>
		</div>
		)
	}
})

render(<App />, document.getElementById('app'));