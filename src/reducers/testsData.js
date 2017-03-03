import constants from '../constants';
import assign from 'lodash/assign';
import concat from 'lodash/concat';

const defaultStates = [ { payload: 'all', text: 'Все вакансии' } ];

function isFetchingTests(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TESTS){
		return true;
	}
	return false;
}

function receiveTests(state = [], action){
	const { type } = action;
	if (type === constants.TESTS_GET_TESTS_SUCCESS){
		return assign([], action.tests);
	}
	return state;
}

function isFetchingTestsScroll(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TESTS_ON_SCROLL){
		return true;
	}
	return false;
}

function receiveTestsOnScroll(state = [], action){
	const { type } = action;
	if (type === constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS){
		return state.concat(action.tests);
	}
	return state;
}

export default function testsData(state = {
	tests: [],
	isFetching: false,
	isFetchingScroll: false,
	search: '',
	page: 0,
	pages_count: 1,
	count: 0,
	order: 'title:desc'
					
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TESTS:
		case constants.TESTS_GET_TESTS_SUCCESS: {
			return assign({}, state, {
				tests: receiveTests(state.tests, action),
				isFetching: isFetchingTests(state.isFetching, action),
				search: action.search,
				page: action.page,
				pages_count: action.pages_count,
				count: action.count,
				statusFilter: {
					states: concat(defaultStates, action.states || []),
					selected: action.state_id || 'all'
				},
				order: action.order
			});
		}
		
		case constants.TESTS_GET_TESTS_ON_SCROLL:
		case constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS: {
			return assign({}, state, {
				tests: receiveTestsOnScroll(state.tests, action),
				isFetchingScroll: isFetchingTestsScroll(state.isFetchingScroll, action),
				page: action.page
			});
		}

		default:
			return state;
	}
}

