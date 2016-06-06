import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

export default React.createClass({
	handleClick: function(){
		// Send help event and token to the server
		// Help event will reverse the user's needsHelp value
		// Token is passed in to verify user identity
		this.props.socket.emit('help', {token: localStorage.getItem('token')});
	},
	componentDidMount: function(){
		this.props.socket.emit('addToConnections', this.props.id)
	},
	render: function() {
		console.log(this.props.needsHelp)
		return(
			<div className='col-sm-2 col-sm-offset-5 login-box'>
				<div className='col-sm-10 col-sm-offset-1'>
					<input onClick={this.handleClick} className={"text-sm-center btn " + (this.props.needsHelp == true ? 'btn-danger' : 'btn-primary') + ' btn-block'} type='submit' value='Help!' />
				</div>
			</div>
		)
	}
})