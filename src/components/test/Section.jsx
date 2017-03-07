import React, { Component } from 'react';
import Question from './Question';
import numDeclension from '../../utils/numDeclension';

class Section extends Component {
	
	constructor(props){
		super(props);
		
		this.handleOpenSection = this.handleOpenSection.bind(this);
	}
	
	handleOpenSection(){
		const { testId, id } = this.props;
		this.props.toggleOpenSection(testId, id);
	}
	
	render(){
		const title = this.props.title || {};
		const { questions, isOpen } = this.props;
		return (
			<div className='section-container'>
				<div className='section'>
					<div
						onClick={this.handleOpenSection}
						className='section__description form-control'
					>
						<span className='section__title'>{title.value}</span>
						<span className='bullet'>•</span>
						<span className='section__question-count'>
							{questions.length} {numDeclension(questions.length, 'вопрос', 'вопроса', 'вопросов')}
						</span>
						<span className='caret section__caret' />
					</div>
					{isOpen && <div className='section__additional'>
						<div className='section__menu'>
							menu
						</div>
						<div className='questions'>
							{questions.map(q => <Question key={q.id} {...q} />)}
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default Section;