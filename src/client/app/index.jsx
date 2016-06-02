import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import tokenHandler from './helpers/tokenHandling.js';
import TeacherPanel from './teachers.jsx';
import StudentPanel from './students.jsx';
import initialState from './helpers/user.js';


var App = React.createClass({
	getInitialState: function(){
		return({user: initialState});
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
	isStudent: function() {
		return(!!(this.state.user.assignment === 'student'))
	},
	teacher: function() {
		return(<TeacherPanel socket={io('/teacher')} />);
	},
	student: function() {
		return(<StudentPanel socket={io('/student')} />);
	},
	logout: function(event) {
		window.localStorage.removeItem('token')
		this.setState({user: initialState})
	},
	componentDidMount: function(){
		if (window.location.search != "") {
			window.localStorage.setItem('token', window.location.search.slice(1))
			history.pushState('', '', "http://" + window.location.hostname + ":" + window.location.port)
		}
		if (!!window.localStorage.getItem('token')){
			var info = tokenHandler.getTokenPayload(window.localStorage.getItem('token'));
			this.setState({user: info})
		} 
	},
	_handleLogin: function(data){
		console.log(data)
		data.assignment === 'student' ? this.student() : this.teacher()
	},
	render: function() {
		// debugger;
		return(
		<div className='jumbotron'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2 select-box'>
						{this.loggedIn() ? this.userPane() : null}
						<a href="/auth/github" className="btn btn-primary"><span className="fa fa-github"></span>   Login with Github</a> 
						<a onClick={this.logout} className="btn btn-primary"><span className="fa fa-github"></span>   Logout</a> 
					</div>
				</div>
			</div>
		</div>
		)
	}
})

render(<App />, document.getElementById('app'));