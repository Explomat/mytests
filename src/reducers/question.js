import changeField from './utils/changeField';
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
		case constants.TESTS_CHANGE_QUESTION_FIELD:
			return changeField(state, action.key, action.value);
		default:
			return state;
	}
}

