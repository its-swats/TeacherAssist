import React from 'react';
import {render} from 'react-dom';

export default React.createClass({
	toggleHelp: function() {
		// Emit an event to the server
		// Sends the user's ID so that the server can find and update the database
		this.props.socket.emit('solved', this.props.data.id);
	},

	render: function() {
		return(
			<div className='col-sm-3 student-card'>
				<h5 className='text-sm-center'>{this.props.data.github.name}</h5>
				{this.props.needsHelp === true ?  <button className='btn btn-block btn-primary' onClick={this.toggleHelp}>Complete</button> : null }
			</div> 
		)
	}
})