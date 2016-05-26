import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import Student from './student.jsx';
import update from 'react-addons-update';
// var socket = io.connect(window.location.host);

export default React.createClass({
	getInitialState: function() {
		return({students: []})
	},
	_updateStudents: function(data){
		console.log(data)
		this.setState({students: data})
		// var index = this.state.students.findIndex(function(student){
		// 	return student.studentName === data.value.studentName
		// });
		// var newState = update(this.state, {students: {[index] : {$merge: data.value}}})
		// this.setState(newState)
	},
	componentDidMount: function(){
		var socket = io('/teacher');
		socket.on('updateStudents', this._updateStudents);
	},
	render: function() {
		return(
		<div className='jumbotron'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2'>
						<h2 className="text-sm-center">Students in need of Help</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2 active-students'>
						{this.state.students.map(function(student){
							if (student.needsHelp === true) {
								return(<Student key={student.id} name={student.name} data={true} />)
							}
						})}
					</div>
				</div>
				<hr></hr>
				<div className='col-sm-8 col-sm-offset-2'>
					<h2 className="text-sm-center">Content Students</h2>
				</div>
				<div className='row'>
					<div className='col-sm-8 col-sm-offset-2 inactive-students'>
						{this.state.students.map(function(student){
							if (student.needsHelp === false) {
								return(<Student key={student.id} name={student.name} data={false} />)
							}
						})}
					</div>
				</div>
			</div>
		</div>
		)
	}
})