import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingQuestion(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST_QUESTION){
		return true;
	}
	return false;
}


export default function question(state = {
	id: null,
	title: {},
	weight: {},
	type: {},
	answers: [],
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST_QUESTION:
		case constants.TESTS_GET_TEST_QUESTION_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingQuestion(state.isFetching, action) });
		default:
			return state;
	}
}

