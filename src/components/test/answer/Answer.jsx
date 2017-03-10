import React, { Component } from 'react';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import MultipleResponseAnswer from './MultipleResponseAnswer';
import OrderAnswer from './OrderAnswer';
import GapFillAnswer from './GapFillAnswer';
import NumericalFillInBlank from './NumericalFillInBlank';
import MatchItemAnswer from './MatchItemAnswer';

const answers = {
	multiple_choice: MultipleChoiceAnswer,
	multiple_response: MultipleResponseAnswer,
	order: OrderAnswer,
	gap_fill: GapFillAnswer,
	numerical_fill_in_blank: NumericalFillInBlank,
	match_item: MatchItemAnswer
};


class Answer extends Component {
	
	constructor(props){
		super(props);
	}
	
	render(){
		const { type } = this.props;
		const AnswerComponent = answers[type.selected] ? answers[type.selected] : null;
		return (
			<div className='answer'>
				<div className='answer__menu clearfix'>
					<i className='answer__trash icon-trash' />
					<span className='answer__direction'>
						<i className='icon-down-open-2' />
						<i className='icon-up-open-2' />
					</span>
				</div>
				{AnswerComponent === null ? null : <AnswerComponent {...this.props} />}
				{/* <DropDown
					items={type.values}
					selectedPayload={type.selected}
					title={type.title}
					onChange={(e, val) => this.handleChangeField('type', val)}
				/>*/}
			</div>
		);
	}
}

export default Answer;