import React, { Component } from 'react';
import Question from './Question';

class Section extends Component {
	
	render(){
		const { title, questions } = this.props;
		return (
			<div className='section'>
				<div>Section - {title}</div>
				{questions && questions.map(q => <Question key={q.id} {...q} />)}
				<br />
				<br />
			</div>
		);
	}
}

export default Section;