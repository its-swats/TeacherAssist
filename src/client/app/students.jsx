import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

export default React.createClass({
	render: function() {
		return(
			<div className='col-sm-2 col-sm-offset-5 login-box'>
				<h5 className='text-sm-center'>Enter your ID:</h5>
				<div className='col-sm-6 col-sm-offset-3'>	
					<input className='form-control' onChange={this.handleChange} type='text' />
				</div>
				<div className='col-sm-10 col-sm-offset-1'>
					<input className='text-sm-center btn btn-primary btn-block' type='submit' value='Help!' />
				</div>
			</div>
		)
	}
})