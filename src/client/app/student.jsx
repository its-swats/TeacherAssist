import React from 'react';
import {render} from 'react-dom';
// import io from 'socket.io-client';
// const socket = io.connect(window.location.host);
import {socket} from './index.jsx';


export default React.createClass({
	_needsHelp: function() {
		if (this.props.data === true) {
			return "Yes"
		} else {
			return "No"
		}
	},
	_toggleHelp: function() {
		socket.emit('toggleHelp', this.props.name, this.props.data);
	},
	render: function() {
		return(
			<div className='jumbotron'>
				<p>Name: {this.props.name}</p>
				<p>Needs Help: {this._needsHelp()}</p>
				<button onClick={this._toggleHelp}>Toggle Help</button>
			</div>
		)
	}
})