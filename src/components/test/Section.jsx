import React, { Component } from 'react';
import Question from './Question';
import numDeclension from '../../utils/numDeclension';

class Section extends Component {
	
	render(){
		const title = this.props.title || {};
		const { questions } = this.props;
		return (
			<div className='section-container'>
				<div className='section form-control'>
					<span className='section__title'>{title.value}</span>
					<span className='bullet'>•</span>
					<span className='section__question-count'>
						{questions.length} {numDeclension(questions.length, 'вопрос', 'вопроса', 'вопросов')}
					</span>
					<span className='caret section__caret' />
				</div>
				<div className='questions'>
					{questions.map(q => <Question key={q.id} {...q} />)}
				</div>
			</div>
		);
	}
}

export default Section;