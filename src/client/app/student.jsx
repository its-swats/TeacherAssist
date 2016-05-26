import React from 'react';
import {render} from 'react-dom';
// import io from 'socket.io-client';
// const socket = io.connect(window.location.host);
import {socket} from './index.jsx';

export default React.createClass({
	_toggleHelp: function() {
		socket.emit('toggleHelp', this.props.name, this.props.data);
	},
	render: function() {
		return(
			<div className='col-sm-3 student-card'>
				<h5 className='text-sm-center'>{this.props.name}</h5>
				
			</div>
		)
	}
})