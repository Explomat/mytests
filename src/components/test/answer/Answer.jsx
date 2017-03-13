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
		this.handleRemove = this.handleRemove.bind(this);
		this.handleMoveUpAnswer = this.handleMoveUpAnswer.bind(this);
		this.handleMoveDownAnswer = this.handleMoveDownAnswer.bind(this);
	}
	
	handleRemove(){
		const { id, removeAnswer } = this.props;
		removeAnswer(id);
	}
	
	handleMoveUpAnswer(){
		const { id, moveUpAnswer } = this.props;
		moveUpAnswer(id);
	}
	
	handleMoveDownAnswer(){
		const { id, moveDownAnswer } = this.props;
		moveDownAnswer(id);
	}
	
	render(){
		const { index, length, type } = this.props;
		const AnswerComponent = answers[type.selected] ? answers[type.selected] : null;
		return (
			<div className='answer'>
				<div className='answer__menu clearfix'>
					<i
						className='answer__trash icon-trash'
						onClick={this.handleRemove}
					/>
					<span className='answer__direction'>
						{(index !== 0) &&
							<i
								className='icon-up-open-2'
								onClick={this.handleMoveUpAnswer}
							/>
						}
						{(index !== length - 1) &&
							<i
								className='icon-down-open-2'
								onClick={this.handleMoveDownAnswer}
							/>
						}
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