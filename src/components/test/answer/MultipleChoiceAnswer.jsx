import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';
import Checkbox from '../../modules/checkbox';

class MultipleChoiceAnswer extends Component {
	
	render(){
		const {
			text,
			is_correct_answer,
			ws_score,
			displayWsScore
		} = this.props;
		return (
			<div className='multiple-choice__answer'>
				<Checkbox
					checked={is_correct_answer.value}
					label={is_correct_answer.title}
					className='multiple-choice__answer-is-correct'
					onChange={val => this.handleChangeField('is_correct_answer', val)}
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

export default MultipleChoiceAnswer;