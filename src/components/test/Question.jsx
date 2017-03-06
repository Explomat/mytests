import React, { Component } from 'react';
import Answer from './Answer';

class Question extends Component {
	
	render(){
		const title = this.props.title || {};
		const { answers } = this.props;
		return (
			<div className='question'>
				<div className='question__title'>Question - {title.value}</div>
				<div className='answers'>
					{answers && answers.map(a => <Answer key={a.id} {...a} />)}
				</div>
			</div>
		);
	}
}

export default Question;