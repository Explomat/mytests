import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import InputReal from '../modules/input-real';
import DropDown from '../modules/dropdown';
import { ButtonPrimary } from '../modules/button';
import Checkbox from '../modules/checkbox';
import Answer from './answer';

class Question extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSave = this.handleSave.bind(this);
		this.handleToggleDisplayWsScore = this.handleToggleDisplayWsScore.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
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
	
	render(){
		const { title, question_points, type, answers } = this.props;
		const { displayWsScore } = this.state;
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
					{answers.map(a =>
						<Answer
							key={a.id}
							type={type}
							displayWsScore={displayWsScore}
							{...a}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default Question;