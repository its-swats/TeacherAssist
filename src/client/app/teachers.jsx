import React from 'react';
import {render} from 'react-dom';
import Student from './student.jsx';
import update from 'react-addons-update';


export default React.createClass({
	getInitialState: function() {
		return({students: []})
	},
	_updateStudents: function(updatedStudent){
		// If the students array is empty, place the entire student object in the state
		// This message is received from eventsTeacher.js
		// Otherwise, update the singular entry
		if (!!updatedStudent.length) {
			this.setState({students: updatedStudent})
		} else {
			// Find the index of the entry that needs to be updated in the state array
			let index = this.state.students.findIndex(function(student){
				return student.id === updatedStudent.data.id
			});
			var newState = update(this.state, {students: {[index] : {$merge: updatedStudent.data}}})
			this.setState(newState)
		}
	},
	componentDidMount: function(){
		this.props.socket.on('updateStudents', this._updateStudents);
	},
	render: function() {
		let socket = this.props.socket
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
								return(<Student key={student.id} data={student} socket={socket} needsHelp={true} />)
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
								return(<Student key={student.id} data={student} socket={socket} needsHelp={false} />)
							}
						})}
					</div>
				</div>
			</div>
		</div>
		)
	}
})