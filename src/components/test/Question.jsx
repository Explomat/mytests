import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import InputReal from '../modules/input-real';
import DropDown from '../modules/dropdown';
import Answer from './Answer';

class Question extends Component {
	
	constructor(props){
		super(props);
		
		this.handleChangeField = this.handleChangeField.bind(this);
	}
	
	handleChangeField(key, value){
		this.props.changeQuestionField(key, value);
	}
	
	render(){
		const { title, weight, type, answers } = this.props;
		return (
			<div className='question col-sm-5 col-md-4 col-lg-3'>
				<TextView
					value={title.value}
					placeholder={title.title}
					onBlur={val => this.handleChangeField('title', val)}
				/>
				<InputReal
					value={weight.value}
					title={weight.title}
					className='form-control'
					onChange={val => this.handleChangeField('weight', val)}
				/>
				<DropDown
					items={type.values}
					selectedPayload={type.selected}
					title={type.title}
					onChange={(e, val) => this.handleChangeField('type', val)}
				/>
				<div className='answers'>
					{answers.map(a => <Answer key={a.id} {...a} />)}
				</div>
			</div>
		);
	}
}

export default Question;