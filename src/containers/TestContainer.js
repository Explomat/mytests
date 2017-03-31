import React, { Component } from 'react';
import Test from '../components/test/Test';
import Confirm from '../components/modules/confirm';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

/* function setAsyncRouteLeaveHook(router, route, hook) {
	let withinHook = false;
	let finalResult;
	let finalResultSet = false;
	router.setRouteLeaveHook(route, nextLocation => {
		withinHook = true;
		if (!finalResultSet) {
			hook(nextLocation).then(result => {
				finalResult = result;
				finalResultSet = true;
				if (!withinHook && nextLocation) {
					// Re-schedule the navigation
					router.transitionTo(nextLocation);
				}
			});
		}
		const result = finalResultSet ? finalResult : false;
		withinHook = false;
		finalResult = undefined;
		finalResultSet = false;
		return result;
	});
}*/

class TestContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this._locationHasChanged = this._locationHasChanged.bind(this);
		this.state = {
			displayConfirmed: false,
			hasConfirmed: null
		};
	}
	
	componentWillMount() {
		const { router, route } = this.props;
		router.setRouteLeaveHook(route, nextLocation => {
			if (this.state.hasConfirmed !== null || nextLocation.pathname !== '/'){
				return true;
			}
			this.setState({ displayConfirmed: true });
			router.goForward();
			return false;
		});
		// setAsyncRouteLeaveHook(this.props.router, this.props.route, this._locationHasChanged);
	}
	
	componentDidMount(){
		const { params } = this.props;
		this.props.getTest(params.testId);
	}
	
	handleConfirm(val){
		this.setState({
			displayConfirmed: false,
			hasConfirmed: val
		});
		if (val){
			this._saveTest();
		} else {
			this._resetTest();
		}
	}
	
	handleClose(){
		this.setState({
			displayConfirmed: false
		});
	}
	
	_saveTest(){
		const { id } = this.props;
		this.props.saveTest(id);
	}
	
	_resetTest(){
		const { id } = this.props;
		this.props.resetTest(id);
	}
	
	_locationHasChanged(/* nextLocation*/){
		/* return new Promise((resolve) => {
			if (nextLocation.pathname !== '/') {
				// No unsaved changes -- leave
				resolve(true);
			}
			else {
			}
			
			if (nextLocation.pathname !== '/') {
				// No unsaved changes -- leave
				resolve(true);
			} else if (confirm('Сохранить тест?')){
				this._saveTest();
				// resolve(true);
			} else {
				this._resetTest();
				// resolve(true);
			}
		});*/
	}
	
	render(){
		const { isFetching } = this.props;
		const { displayConfirmed } = this.state;
		return (
			<div className='test-container clearfix'>
				{displayConfirmed && <Confirm text='Test' onConfirm={this.handleConfirm} onClose={this.handleClose}/>}
				{isFetching ? <div className='overlay-loading overlay-loading--show' /> : <Test {...this.props}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { selectedTestTab } = state.app;
	const { data, isFetching } = state.test;
	return { ...data, isFetching, selectedTestTab };
}

export default connect(mapStateToProps, actionCreators)(TestContainer);