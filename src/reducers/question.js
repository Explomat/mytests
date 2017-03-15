import changeField from './utils/changeField';
import constants from '../constants';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';

function isFetchingQuestion(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST_QUESTION){
		return true;
	}
	return false;
}

function answer(state = {}, action) {
	switch (action.type) {
		case constants.TESTS_ADD_NEW_ANSWER_SUCCESS: {
			return {
				...state,
				...action.answer
			};
		}
		default:
			return state;
	}
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
		case constants.TESTS_REMOVE_ANSWER: {
			return {
				...state,
				answers: state.answers.filter(a => a.id !== action.answerId)
			};
		}
		case constants.TESTS_MOVE_UP_ANSWER: {
			const { answers } = state;
			const answerIndex = findIndex(answers, a => a.id === action.answerId);
			
			if (answers.length < 2
				|| answerIndex === -1
				|| answerIndex === 0
			) return state;
				
			const nextAnswerIndex = answerIndex - 1;
			
			const curAnswer = answers[answerIndex];
			answers[answerIndex] = answers[nextAnswerIndex];
			answers[nextAnswerIndex] = curAnswer;
			
			return {
				...state,
				answers: answers.map(a => a)
			};
		}
		case constants.TESTS_MOVE_DOWN_ANSWER: {
			const { answers } = state;
			const answerIndex = findIndex(answers, a => {
				return a.id === action.answerId;
			});
			
			if (answers.length < 2
				|| answerIndex === -1
				|| answerIndex === answers.length + 1
			) return state;
				
			const nextAnswerIndex = answerIndex + 1;
			
			const curAnswer = answers[answerIndex];
			answers[answerIndex] = answers[nextAnswerIndex];
			answers[nextAnswerIndex] = curAnswer;
			
			return {
				...state,
				answers: state.answers.map(a => a)
			};
		}
		case constants.TESTS_ADD_NEW_ANSWER_SUCCESS: {
			const a = answer(undefined, action);
			return {
				...state,
				answers: state.answers.concat([ a ])
			};
		}
		default:
			return state;
	}
}

