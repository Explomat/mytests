/* import { get } from '../utils/ajax';
import { url } from '../config';*/
import constants from '../constants';
import { info } from './appCreators';
import {
	saveMockTest,
	getMockTests,
	getMockTest,
	getMockQuestion,
	getMockQuestions,
	saveMockQuestion,
	getMockQuestionTemplate
} from './mock';

export function getTest(testId){
	return (dispatch, getState) => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Тест' });
		dispatch({ type: constants.TESTS_GET_TEST });
		
		// если есть тест в редьюсере, то нужно вернуть значения из него, а не получать с сервера не измененные значения
		// и получить с сервера только новые вопроосы, которые могут быть изменены в отдельноv окне
		const state = getState();
		const { data, templates } = state.test;
		if (data && data.id !== null && data.id.toString() === testId.toString()){
			setTimeout(() => {
				const questions = getMockQuestions(testId);
				dispatch({
					type: constants.TESTS_GET_TEST_SUCCESS,
					response: { data: { ...data, questions }, templates }
				});
			}, 300);
			/* const path = config.url.createPath({
				server_name: 'mytests',
				action_name: 'Questions',
				test_id: testId
			});
			get(path)
			.then(resp => JSON.parse(resp))
			.then(data => {
				if (data.error){
					dispatch(error(data.error));
				} else {
					dispatch({
						type: constants.TESTS_GET_TEST_SUCCESS,
						response: { ...state.test, questions: data }
					});
				}
			})
			.catch(e => {
				dispatch(error(e.message));
			});*/
		} else {
			setTimeout(() => {
				dispatch({
					type: constants.TESTS_GET_TEST_SUCCESS,
					response: getMockTest(testId)
				});
			}, 300);
			/* const path = config.url.createPath({
				server_name: 'mytests',
				action_name: 'Test',
				test_id: testId
			});
			get(path, true)
			.then(resp => JSON.parse(resp))
			.then(data => {
				if (data.error){
					dispatch(error(data.error));
				} else {
					dispatch({ type: constants.TESTS_GET_TEST_SUCCESS, response: data });
				}
			})
			.catch(e => {
				dispatch(error(e.message));
			});*/
		}
	};
}

export function saveTest(testId){
	return (dispatch, getState) => {
		dispatch({
			type: constants.TESTS_SAVE_TEST
		});
		
		setTimeout(() => {
			const { test } = getState();
			saveMockTest(testId, test.data);
			window.location.href = '#';
			/* dispatch(info('Тест сохранен.'));
			dispatch({
				type: constants.TESTS_SAVE_TEST_SUCCESS
			});*/
		}, 300);
	};
}

export function resetTest(testId){
	return (dispatch, getState) => {
		dispatch({
			type: constants.TESTS_RESET_TEST
		});
		
		setTimeout(() => {
			const { test } = getState();
			saveMockTest(testId, test.defaultData);
			dispatch({
				type: constants.TESTS_RESET_TEST_SUCCESS
			});
			window.location.href = '#';
			/* dispatch({
				type: constants.TESTS_SAVE_TEST_SUCCESS
			});*/
		}, 300);
	};
}

export function getTests(search, page, order){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Тесты' });
		dispatch({ type: constants.TESTS_GET_TESTS });
		
		setTimeout(() => {
			const data = getMockTests(search, page, order);
			dispatch({
				type: constants.TESTS_GET_TESTS_SUCCESS,
				response: {
					search,
					page,
					order,
					...data
				}
			});
		}, 300);
		
		/* const path = config.url.createPath({
			server_name: 'mytests',
			action_name: 'Tests',
			search,
			page,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.TESTS_GET_TESTS_SUCCESS,
					...data,
					search,
					page,
					order
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function getTestsOnScroll(search, page, order){
	return dispatch => {
		dispatch({ type: constants.TESTS_GET_TESTS_ON_SCROLL });
		
		setTimeout(() => {
			const data = getMockTests(search, page, order);
			dispatch({
				type: constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS,
				page,
				order,
				...data
			});
		}, 300);
		
		/* const path = url.createPath({
			server_name: 'mytests',
			action_name: 'Tests',
			search,
			page,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.TESTS_GET_TESTS_ON_SCROLL_SUCCESS,
					...data,
					page,
					order
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function getQuestion(testId, sectionId, questionId){
	return dispatch => {
		dispatch({ type: constants.TESTS_GET_TEST_QUESTION });
		
		setTimeout(() => {
			const data = getMockQuestion(testId, sectionId, questionId);
			dispatch({
				type: constants.TESTS_GET_TEST_QUESTION_SUCCESS,
				response: data
			});
		}, 300);
	};
}

export function saveQuestion(testId, sectionId, questionId){
	return (dispatch, getState) => {
		const state = getState();
		// dispatch({ type: constants.TESTS_SAVE_TEST_QUESTION });
		
		setTimeout(() => {
			saveMockQuestion(testId, sectionId, questionId, state.question.data);
			dispatch(info('Вопрос сохранен в базу.'));
		}, 300);
	};
}


export function selectAnswer(answerId){
	return {
		type: constants.TESTS_SELECT_ANSWER,
		answerId
	};
}
export function removeAnswer(answerId){
	return {
		type: constants.TESTS_REMOVE_ANSWER,
		answerId
	};
}
export function moveUpAnswer(answerId){
	return {
		type: constants.TESTS_MOVE_UP_ANSWER,
		answerId
	};
}
export function moveDownAnswer(answerId){
	return {
		type: constants.TESTS_MOVE_DOWN_ANSWER,
		answerId
	};
}

export function removeSection(sectionId){
	return {
		type: constants.TESTS_REMOVE_SECTION,
		sectionId
	};
}

export function addNewSection(testId){
	return (dispatch, getState) => {
		dispatch({
			type: constants.TESTS_ADD_NEW_SECTION,
			testId
		});
		const test = getState().test;
		const section = test.data.sections[test.data.sections.length - 1];
		
		dispatch({
			type: constants.TESTS_TOGGLE_OPEN_SECTION,
			sectionId: section.id
		});
		
		const state = getState();
		const { sections } = state.test.data;
		dispatch({
			type: constants.APP_CHANGE_OPENED_TEST_SECTIONS,
			sections
		});
	};
}

export function addNewQuestion(testId, sectionId){
	return dispatch => {
		dispatch({
			type: constants.TESTS_ADD_NEW_QUESTION
		});
		
		setTimeout(() => {
			const question = getMockQuestionTemplate();
			dispatch({
				type: constants.TESTS_ADD_NEW_QUESTION_SUCCESS,
				question
			});
			window.location.href = `#questions/new/${testId}/${sectionId}`;
		}, 300);
	};
}

export function addNewAnswer(){
	return {
		type: constants.TESTS_ADD_NEW_ANSWER
	};
}

export function toggleOpenSection(sectionId){
	return (dispatch, getState) => {
		dispatch({
			type: constants.TESTS_TOGGLE_OPEN_SECTION,
			sectionId
		});
		
		const state = getState();
		const { sections } = state.test.data;
		dispatch({
			type: constants.APP_CHANGE_OPENED_TEST_SECTIONS,
			sections
		});
	};
}

export function changeTestField(key, value){
	return {
		type: constants.TESTS_CHANGE_TEST_FIELD,
		key,
		value
	};
}

export function changeTestFieldInSection(sectionId, key, value){
	return {
		type: constants.TESTS_CHANGE_FIELD_IN_SECTION,
		sectionId,
		key,
		value
	};
}

export function changeQuestionField(key, value){
	return {
		type: constants.TESTS_CHANGE_QUESTION_FIELD,
		key,
		value
	};
}

export function changeAnswerField(id, key, value){
	return {
		type: constants.TESTS_CHANGE_ANSWER_FIELD,
		answerId: id,
		key,
		value
	};
}

export function changeQuestionType(payload){
	return {
		type: constants.TESTS_CHANGE_TEST_QUESTION_TYPE,
		payload
	};
}

export function changeTestTab(tab){
	return {
		type: constants.APP_CHANGE_TEST_TAB,
		tab
	};
}