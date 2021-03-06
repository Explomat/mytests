import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';
import DropDown from '../../modules/dropdown';

class NumericalFillInBlank extends Component {
	
	constructor(props){
		super(props);
		this.handleChangeField = this.handleChangeField.bind(this);
	}
	
	handleChangeField(key, value){
		const { id } = this.props;
		this.props.changeAnswerField(id, key, value);
	}
	
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
				<div className='numerical-fill-in-blank__condition clearfix'>
					<DropDown
						items={grading_option_id.values}
						selectedPayload={grading_option_id.selected}
						className='numerical-fill-in-blank__condition-icon'
						onChange={(e, val) => this.handleChangeField('grading_option_id', val)}
					/>
					<div className='numerical-fill-in-blank__condition-expression'>
						<InputReal
							value={value.value}
							title={value.title}
							className='form-control'
							placeholder='Введите число'
							onChange={val => this.handleChangeField('value', val)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default NumericalFillInBlank;