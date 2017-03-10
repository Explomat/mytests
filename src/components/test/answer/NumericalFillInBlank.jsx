import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';
import DropDown from '../../modules/dropdown';

class NumericalFillInBlank extends Component {
	
	render(){
		const {
			text,
			ws_score,
			displayWsScore,
			condition
		} = this.props;
		const { value, grading_option_id } = condition;
		return (
			<div className='numerical-fill-in-blank__answer'>
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
				<DropDown
					items={grading_option_id.values}
					selectedPayload={grading_option_id.selected}
					onChange={(e, val) => this.handleChangeField('grading_option_id', val)}
				/>
				<InputReal
					value={value.value}
					title={value.title}
					className='form-control'
					placeholder='Введите числовое выражение'
					onChange={val => this.handleChangeField('value', val)}
				/>
			</div>
		);
	}
}

export default NumericalFillInBlank;