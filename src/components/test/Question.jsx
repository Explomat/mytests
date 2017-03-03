import React, { Component } from 'react';
import Answer from './Answer';

class Question extends Component {
	
	render(){
		const { title, weight, type, answers } = this.props;
		return (
			<div className='question'>
				<div>Question - {title} / {weight} / {type}</div>
				{answers && answers.map(a => <Answer key={a.id} {...a} />)}
			</div>
		);
	}
}

export default Question;