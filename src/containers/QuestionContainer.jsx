import React, { Component } from 'react';
import Question from '../components/test/Question';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class QuestionContainer extends Component {
	
	componentDidMount(){
		const { params } = this.props;
		this.props.getQuestion(params.testId, params.sectionId, params.questionId);
	}
	
	render(){
		const { isFetching } = this.props;
		return (
			<div className='test-container'>
				{isFetching ? <div className='overlay-loading overlay-loading--show' /> : <Question {...this.props}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { data, isFetching } = state.question;
	return { ...data, isFetching };
}

export default connect(mapStateToProps, actionCreators)(QuestionContainer);