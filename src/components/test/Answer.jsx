import React, { Component } from 'react';

class Answer extends Component {
	
	render(){
		const text = this.props.text || {};
		return (
			<div className='answer'>
				<div className='answer__title'>Answer - {text.value}</div>
			</div>
		);
	}
}

export default Answer;