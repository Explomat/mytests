import changeField from './utils/changeField';
import constants from '../constants';
import questionTypes from './utils/questionTypes';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';

function isFetchingQuestion(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST_QUESTION){
		return true;
	}
	return false;
}

export default function question(state = {
	data: {
		id: null,
		title: {},
		type: {},
		question_points: {},
		answers: []
	},
	templates: {},
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST_QUESTION:
		case constants.TESTS_GET_TEST_QUESTION_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingQuestion(state.isFetching, action) });
			
		case constants.TESTS_ADD_NEW_QUESTION_SUCCESS: {
			return {
				...action.question,
				isFetching: true
			};
		}
		case constants.TESTS_CHANGE_QUESTION_FIELD:
			return assign({}, state, { data: changeField(state.data, action.key, action.value) });
		case constants.TESTS_CHANGE_TEST_QUESTION_TYPE:{
			const { answers } = state.data;
			const newState = changeField(state.data, 'type', action.payload);
			if (action.payload === questionTypes.multiple_choice) {
				return {
					...state,
					data: {
						...newState,
						answers: answers.map(a => {
							const { is_correct_answer } = a;
							return {
								...a,
								is_correct_answer: {
									...is_correct_answer,
									value: false
								}
							};
						})
					}
				};
			}
			return { data: newState };
		}
		
		case constants.TESTS_SELECT_ANSWER:{
			const { type, answers } = state.data;
			const { selected } = type;
			const ans = answers.map(a => {
				const { is_correct_answer } = a;
				if (selected === 'multiple_choice') {
					return a.id === action.answerId ? {
						...a,
						is_correct_answer: {
							...is_correct_answer,
							value: true
						}
					} : {
						...a,
						is_correct_answer: {
							...is_correct_answer,
							value: false
						}
					};
				}
				return a.id === action.answerId ? {
					...a,
					is_correct_answer: {
						...is_correct_answer,
						value: !is_correct_answer.value
					}
				} : a;
			});
			return {
				...state,
				data: {
					...state.data,
					answers: ans
				}
			};
		}
		
		case constants.TESTS_CHANGE_ANSWER_FIELD: {
			const { answers } = state.data;
			return {
				...state,
				data: {
					...state.data,
					answers: answers.map(a => {
						return a.id === action.answerId ?
							changeField(a, action.key, action.value) :
							a;
					})
				}
			};
		}
		
		case constants.TESTS_REMOVE_ANSWER: {
			const { answers } = state.data;
			return {
				...state,
				data: {
					...state.data,
					answers: answers.filter(a => a.id !== action.answerId)
				}
			};
		}
		case constants.TESTS_MOVE_UP_ANSWER: {
			const { answers } = state.data;
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
				data: {
					...state.data,
					answers: answers.map(a => a)
				}
			};
		}
		case constants.TESTS_MOVE_DOWN_ANSWER: {
			const { answers } = state.data;
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
				data: {
					...state.data,
					answers: answers.map(a => a)
				}
			};
		}
		case constants.TESTS_ADD_NEW_ANSWER: {
			const ans = {
				...state.templates.answer,
				id: state.data.answers.length,
				is_new: true
			};
			const { answers } = state.data;
			return {
				...state,
				data: {
					...state.data,
					answers: answers.concat([ ans ])
				}
			};
		}
		default:
			return state;
	}
}

