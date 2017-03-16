import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';
import Checkbox from '../../modules/checkbox';

class MultipleResponseAnswer extends Component {
	
	constructor(props){
		super(props);
		this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
	}
	
	handleSelectAnswer(){
		const { id } = this.props;
		this.props.selectAnswer(id);
	}
	
	render(){
		const {
			text,
			is_correct_answer,
			ws_score,
			displayWsScore
		} = this.props;
		return (
			<div className='multiple-response__answer'>
				<Checkbox
					checked={is_correct_answer.value}
					label={is_correct_answer.title}
					className='multiple-response__answer-is-correct'
					onChange={this.handleSelectAnswer}
				/>
				<TextView
					value={text.value}
					placeholder={text.title}
					onBlur={val => this.handleChangeField('text', val)}
				/>
				{displayWsScore &&
					<InputReal
						value={ws_score.value}
						title={ws_score.title}
						className='form-control'
						onChange={val => this.handleChangeField('ws_score', val)}
					/>
				}
			</div>
		);
	}
}

export default MultipleResponseAnswer;