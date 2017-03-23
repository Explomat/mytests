import React, { Component } from 'react';
import ShortQuestion from './ShortQuestion';
import { TextView } from '../modules/text-label';
import { ButtonPrimary } from '../modules/button';
import DropDown from '../modules/dropdown';
import numDeclension from '../../utils/numDeclension';
import cx from 'classnames';

class Section extends Component {
	
	constructor(props){
		super(props);
		
		this.handleOpenSection = this.handleOpenSection.bind(this);
		this.handleRemoveSection = this.handleRemoveSection.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleAddNewQuestion = this.handleAddNewQuestion.bind(this);
	}
	
	handleOpenSection(){
		const { id } = this.props;
		this.props.toggleOpenSection(id);
	}
	
	handleRemoveSection(){
		const { id } = this.props;
		this.props.removeSection(id);
	}
	
	handleChangeField(key, value){
		const { id } = this.props;
		this.props.changeTestFieldInSection(id, key, value);
	}
	
	handleAddNewQuestion(){
		const { testId, id } = this.props;
		this.props.addNewQuestion(testId, id);
	}
	
	render(){
		const { testId, id, title, order, questions, openedTestSections } = this.props;
		const isOpen = openedTestSections.indexOf(id) !== -1;
		const caretClasses = cx({
			'caret': true,
			'caret--rotate': isOpen,
			'section__caret': true
		});
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
						<span className={caretClasses} />
					</div>
					{isOpen && <div className='section__additional'>
						<ButtonPrimary text='Удалить' onClick={this.handleRemoveSection}/>
						<div className='section__menu'>
							<TextView
								value={title.value}
								placeholder={title.title}
								onBlur={val => this.handleChangeField('title', val)}
							/>
							<DropDown
								items={order.values}
								selectedPayload={order.selected}
								title={order.title}
								onChange={(e, val) => this.handleChangeField('order', val)}
							/>
							<ButtonPrimary text='Добавить вопрос' onClick={this.handleAddNewQuestion}/>
						</div>
						<div className='short-questions'>
							{questions.map(q => <ShortQuestion key={q.id} link={`#question/${testId}/${id}/${q.id}`} {...q} />)}
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default Section;