import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';
import DropDown from '../../modules/dropdown';
import Checkbox from '../../modules/checkbox';

class GapFillAnswer extends Component {
	
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
		const { value, case_sensitive, sentence_option_id } = condition;
		return (
			<div className='gap-fill__answer'>
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
				<div className='gap-fill__condition clearfix'>
					<DropDown
						items={sentence_option_id.values}
						selectedPayload={sentence_option_id.selected}
						className='gap-fill__condition-icon'
						onChange={(e, val) => this.handleChangeField('sentence_option_id', val)}
					/>
					<TextView
						value={value.value}
						placeholder={value.title}
						className='gap-fill__condition-expression'
						onBlur={val => this.handleChangeField('value', val)}
					/>
				</div>
				<Checkbox
					checked={case_sensitive.value}
					label={case_sensitive.title}
					onChange={val => this.handleChangeField('case_sensitive', val)}
				/>
			</div>
		);
	}
}

export default GapFillAnswer;