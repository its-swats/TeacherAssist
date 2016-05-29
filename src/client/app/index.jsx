import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import TeacherPanel from './teachers.jsx';
import StudentPanel from './students.jsx';


var App = React.createClass({
	teacher: function() {
		render(<TeacherPanel socket={io('/teacher')} />, document.getElementById('app'));
	},
	student: function() {
		render(<StudentPanel socket={io('/student')} />, document.getElementById('app'));
	},
	componentDidMount: function(){
		var mainSocket = io('');
		mainSocket.on('facebook', this._handleLogin)
	},
	_handleLogin: function(data){
		console.log(data)
		data.assignment === 'student' ? this.student() : this.teacher()
	},
	render: function() {
		return(
		<div className='jumbotron'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2 select-box'>
						<a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span>   Login with Facebook</a> 
						<a href="/auth/github" className="btn btn-primary"><span className="fa fa-github"></span>   Login with Github</a> 
					</div>
				</div>
			</div>
		</div>
		)
	}
})

render(<App />, document.getElementById('app'));