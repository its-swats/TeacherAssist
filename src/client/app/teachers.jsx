import React from 'react';
import {render} from 'react-dom';
import {socket} from './index.jsx';


export default React.createClass({
	_updateList: function(data){
		console.log('updating')
		var index = this.state.students.findIndex(function(student){
			return student.studentName === data.value.studentName
		});
		var newState = update(this.state, {students: {[index] : {$merge: data.value}}})
		this.setState(newState)
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