import React, { Component } from 'react';

class Answer extends Component {
	
	render(){
		const { text, weight } = this.props;
		return (
			<div className='answer'>
				<div>Answer - {text} / {weight}</div>
			</div>
		);
	}
}

export default Answer;