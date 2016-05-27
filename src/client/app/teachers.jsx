import React from 'react';
import {render} from 'react-dom';
import Student from './student.jsx';
import update from 'react-addons-update';


export default React.createClass({
	getInitialState: function() {
		return({students: []})
	},
	_updateStudents: function(data){
		if (!!data.length) {
			this.setState({students: data})
		} else {
			console.log(data)
			var index = this.state.students.findIndex(function(student){
				return student.id === data.id
			});
			var newState = update(this.state, {students: {[index] : {$merge: data}}})
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
								return(<Student key={student.id} id={student.id} name={student.name} socket={socket} needsHelp={true} />)
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
								return(<Student key={student.id} id={student.id} name={student.name} socket={socket} needsHelp={false} />)
							}
						})}
					</div>
				</div>
			</div>
		</div>
		)
	}
})