import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
// var socket = io.connect(window.location.host);

export default React.createClass({
	getInitialState: function() {
		return({students: []})
	},
	_updateList: function(data){
		var index = this.state.students.findIndex(function(student){
			return student.studentName === data.value.studentName
		});
		var newState = update(this.state, {students: {[index] : {$merge: data.value}}})
		this.setState(newState)
	},
	componentDidMount: function(){
		var socket = io('/teacher')
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
						{//this.state.students.map(function(student){
						//	if (student.data === true) {
							//	return(<Student key={student.studentName} name={student.studentName} data={true} />)
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
						{//this.state.students.map(function(student){
						//	if (student.data === false) {
							//	return(<Student key={student.studentName} name={student.studentName} data={false} />)
							}
						})}
					</div>
				</div>
			</div>
		</div>
		)
	}
})