import React from 'react';
import {render} from 'react-dom';

export default React.createClass({
	render: function(){
		return(
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<img src={this.props.info.github.picture}></img>
					<p>{this.props.info.github.name}</p>
					<p>{this.props.info.assignment}</p>
				</div>
			</div>
		)
	}
})