import React, { Component } from 'react';
import Question from './Question';

class Section extends Component {
	
	render(){
		const title = this.props.title || {};
		const { questions } = this.props;
		return (
			<div className='section'>
				<div className='section__title'>{title.value}</div>
				<div className='questions'>
					{questions && questions.map(q => <Question key={q.id} {...q} />)}
				</div>
			</div>
		);
	}
}

export default Section;