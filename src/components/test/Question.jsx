import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import InputReal from '../modules/input-real';
import DropDown from '../modules/dropdown';
import { ButtonPrimary } from '../modules/button';
import Checkbox from '../modules/checkbox';
import Answer from './answer';
import numDeclension from '../../utils/numDeclension';

class Question extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSave = this.handleSave.bind(this);
		this.handleToggleDisplayWsScore = this.handleToggleDisplayWsScore.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleAddNewAnswer = this.handleAddNewAnswer.bind(this);
		this.state = {
			displayWsScore: false
		};
	}
	
	handleSave(){
		const { testId, sectionId } = this.props.params;
		const { id } = this.props;
		this.props.saveQuestion(testId, sectionId, id);
	}
	
	handleToggleDisplayWsScore(){
		this.setState({ displayWsScore: !this.state.displayWsScore });
	}
	
	handleChangeField(key, value){
		this.props.changeQuestionField(key, value);
	}
	
	handleAddNewAnswer(){
		const { id } = this.props;
		this.props.addNewAnswer(id);
	}
	
	render(){
		const { title, question_points, type, answers } = this.props;
		const { displayWsScore } = this.state;
		const answersLen = answers.length;
		return (
			<div className='question col-sm-5 col-md-4 col-lg-3'>
				<div className='question__settings'>
					<ButtonPrimary onClick={this.handleSave} text='Сохранить' />
					<Checkbox
						onChange={this.handleToggleDisplayWsScore}
						checked={displayWsScore}
						label='Показывать вес ответов в данной карточке'
					/>
				</div>
				<div className='question__fields'>
					<TextView
						value={title.value}
						placeholder={title.title}
						onBlur={val => this.handleChangeField('title', val)}
					/>
					<InputReal
						value={question_points.value}
						title={question_points.title}
						className='form-control'
						onChange={val => this.handleChangeField('question_points', val)}
					/>
					<DropDown
						items={type.values}
						selectedPayload={type.selected}
						title={type.title}
						onChange={(e, val) => this.handleChangeField('type', val)}
					/>
				</div>
				<div className='answers'>
					<div className='answers__title'>{answersLen} {numDeclension(answersLen, 'ответ', 'ответа', 'ответов')}</div>
					<ButtonPrimary text='Добавить ответ' onClick={this.handleAddNewAnswer}/>
					{answers.map((a, index) => {
						return (
							<Answer
								key={a.id}
								index={index}
								length={answersLen}
								type={type}
								displayWsScore={displayWsScore}
								removeAnswer={this.props.removeAnswer}
								moveUpAnswer={this.props.moveUpAnswer}
								moveDownAnswer={this.props.moveDownAnswer}
								{...a}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Question;