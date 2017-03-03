import React, { Component } from 'react';
import Test from '../components/test/Test';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class TestContainer extends Component {
	
	componentDidMount(){
		const { params } = this.props;
		this.props.getTest(params.testId);
	}
	
	render(){
		const { isFetching } = this.props;
		return (
			<div className='test-container'>
				{isFetching ? <div className='overlay-loading overlay-loading--show' /> : <Test {...this.props}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.test };
}

export default connect(mapStateToProps, actionCreators)(TestContainer);