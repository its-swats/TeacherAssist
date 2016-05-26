import React from 'react';
import {render} from 'react-dom';
// import io from 'socket.io-client';
import Student from './student.jsx';
import update from 'react-addons-update';
import Teacher from './teachers.jsx';
// export const socket = io.connect(window.location.host);
// export const socket2 = io('/test')

var App = React.createClass({
	teach: function() {
		render(<Teacher />, document.getElementById('app'))
	},
	render: function() {
		return(
		<div className='jumbotron'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2 text-sm-center'>
						<h1 className=''>Select a Role</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-4 col-sm-offset-2 select-box'>
						<button onClick={this.teach}className="btn btn-primary btn-lg btn-block">Teacher</button>
					</div>
					<div className='col-sm-4 select-box'>
						<button className="btn btn-primary btn-lg btn-block">Student</button>
					</div>
				</div>
			</div>
		</div>
		)
	}
})

render(<App />, document.getElementById('app'));