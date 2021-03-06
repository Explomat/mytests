import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';

class OrderAnswer extends Component {
	
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
			displayWsScore
		} = this.props;
		return (
			<div className='order__answer'>
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

export default OrderAnswer;