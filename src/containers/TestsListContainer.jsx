import React, { Component } from 'react';
import TestsList from '../components/TestsList';
import SearchBarCount from '../components/modules/search-bar-count';
import { DropDownIcon, DropDownIconItem } from '../components/modules/dropdown-icon';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import cx from 'classnames';

class TestsListContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSortByTitle = this.handleSortByTitle.bind(this);
		this._getTests = this._getTests.bind(this);
		
		this._srollDown = this._srollDown.bind(this);
		this._toggleUpIcon = this._toggleUpIcon.bind(this);
		
		this.state = {
			showUpIcon: false
		};
	}
	
	componentDidMount(){
		const { search, order } = this.props;
		this._getTests(search, 0, order);
		window.addEventListener('scroll', this._srollDown);
		window.addEventListener('scroll', this._toggleUpIcon);
	}
	
	componentWillUnmount(){
		window.removeEventListener('scroll', this._srollDown);
		window.removeEventListener('scroll', this._toggleUpIcon);
	}
	
	handleSearch(val){
		const { order } = this.props;
		this._getTests(val, 0, order);
	}
	
	handleSortByTitle(e, payload){
		const { search } = this.props;
		this._getTests(search, 0, payload);
	}
	
	_toggleUpIcon() {
		this.setState({
			showUpIcon: window.pageYOffset > document.documentElement.clientHeight
		});
	}
	
	_srollDown(){
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const offset = window.pageYOffset;
		
		const { isFetchingScroll, search, page, pages_count, order } = this.props;
		if (scrollHeight - (clientHeight + offset) < 100 && !isFetchingScroll && (page + 1) <= pages_count) {
			this.props.getTestsOnScroll(search, page + 1, order);
		}
	}
	
	_getTests(search, page, order){
		this.props.getTests(search, page, order);
	}
	
	render(){
		const { isFetching, isFetchingScroll, curCount, allCount } = this.props;
		const { search } = this.props;
		const upIconClasses = cx({
			'up-icon': true,
			'up-icon--show': this.state.showUpIcon
		});
		return (
			<div className='tests-container'>
				<span
					className={upIconClasses}
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<i className='icon-up-open-2' />
				</span>
				<div className='tests-container__header'>
					<div className='tests-container__filters'>
						<div className='tests-container__search-bar-container'>
							<SearchBarCount
								firstValue={curCount}
								secondValue={allCount}
								onSearch={this.handleSearch}
								value={search}
							/>
						</div>
						<div className='tests-container__filters'>
							<DropDownIcon
								icon={<i className='icon-arrow-combo' />}
								className='default-button tests-container__sort'
							>
								<DropDownIconItem
									onClick={this.handleSortByTitle}
									payload={'title:asc'}
									text='По названию (А-я)'
								/>
								<DropDownIconItem
									onClick={this.handleSortByTitle}
									payload={'title:desc'}
									text='По названию (я-А)'
								/>
							</DropDownIcon>
						</div>
					</div>
				</div>
				<div className='tests-container__body'>
					{isFetching ?
						<div key='overlay-loading' className='overlay-loading overlay-loading--show' />
						: <TestsList {...this.props}/>
					}
				</div>
				{isFetchingScroll &&
					<div className='tests-container__scroll-loading'>
						<div className='overlay-loading overlay-loading--show' />
					</div>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { tests } = state.testsData.data;
	const { isFetching, isFetchingScroll } = state.testsData;
	return {
		curCount: tests.length,
		allCount: state.testsData.count,
		isFetching,
		isFetchingScroll,
		...state.testsData.data
	};
}

export default connect(mapStateToProps, actionCreators)(TestsListContainer);