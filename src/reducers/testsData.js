import constants from '../constants';

const defaultStates = [ { payload: 'all', text: 'Все вакансии' } ];

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
			return {
				...state,
				isFetching: true
			};
		case constants.TESTS_GET_TESTS_SUCCESS: {
			const { data } = action.response;
			return {
				...state,
				data: {
					...state.data,
					...data,
					statusFilter: {
						states: defaultStates.concat(action.states || []),
						selected: action.state_id || 'all'
					}
				},
				isFetching: false
			};
		}
		
		case constants.TESTS_GET_TESTS_ON_SCROLL:
			return {
				...state,
				isFetchingScroll: true
			};
		case constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS: {
			const { tests } = state.data;
			return {
				...state,
				data: {
					...state.data,
					tests: receiveTestsOnScroll(tests, action),
					page: action.page
				},
				isFetchingScroll: false
			};
		}

		default:
			return state;
	}
}

