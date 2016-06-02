import React from 'react';
import {render} from 'react-dom';

var LoginForm = React.createClass({
	render: function(){
		return(
		<div className='row'>
			<div className='col-sm-8 col-sm-offset-2 select-box'>
				<a href="/auth/github" className="btn btn-primary"><span className="fa fa-github"></span>   Login with Github</a>  
			</div>
		</div>
		)
	}
})

module.exports = LoginForm;