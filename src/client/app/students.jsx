import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

export default React.createClass({
	getInitialState: function() {
		return({id: null})
	},
	handleClick: function(){
		this.props.socket.emit('help', {token: localStorage.getItem('token'), id: this.props.socket.id});
	},
	componentDidMount: function(){

	},
	render: function() {
		return(
			<div className='col-sm-2 col-sm-offset-5 login-box'>
				<div className='col-sm-10 col-sm-offset-1'>
					<input onClick={this.handleClick} className={"text-sm-center btn " + (this.props.needsHelp == true ? 'btn-primary' : 'btn-danger') + ' btn-block'} type='submit' value='Help!' />
				</div>
			</div>
		)
	}
})