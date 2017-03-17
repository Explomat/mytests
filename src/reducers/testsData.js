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
		return state.concat([], action.tests);
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
	data: {
		tests: [],
		search: '',
		page: 0,
		pages_count: 1,
		count: 0,
		order: 'title:desc'
	},
	templates: {},
	isFetching: false,
	isFetchingScroll: false
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TESTS:
		case constants.TESTS_GET_TESTS_SUCCESS: {
			const { data } = action.response;
			return {
				...state,
				data: {
					...data,
					tests: state.concat([], data.tests),
					statusFilter: {
						states: concat(defaultStates, action.states || []),
						selected: action.state_id || 'all'
					}
				},
				isFetching: isFetchingTests(state.isFetching, action)
			};
		}
		
		case constants.TESTS_GET_TESTS_ON_SCROLL:
		case constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS: {
			const { tests } = state.data;
			return assign({}, state, {
				data: {
					tests: receiveTestsOnScroll(tests, action),
					page: action.page
				},
				isFetchingScroll: isFetchingTestsScroll(state.isFetchingScroll, action)
			});
		}

		default:
			return state;
	}
}

