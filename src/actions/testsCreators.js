/* import { get } from '../utils/ajax';
import { url } from '../config';*/
import constants from '../constants';
import { info } from './appCreators';
import {
	mockGetTests,
	getMockTest,
	getMockQuestion,
	getMockQuestions,
	saveMockQuestion,
	addMockNewAnswer
} from './mock';

export function getTest(testId){
	return (dispatch, getState) => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Тест' });
		dispatch({ type: constants.TESTS_GET_TEST });
		
		// если есть тест в редьюсере, то нужно вернуть значения из него, а не получать с сервера не измененные значения
		// и получить с сервера только новые вопроосы, которые могут быть изменены в отдельноv окне
		const state = getState();
		if (state.test && state.test.id !== null && state.test.id.toString() === testId.toString()){
			setTimeout(() => {
				const data = getMockQuestions(testId);
				dispatch({
					type: constants.TESTS_GET_TEST_SUCCESS,
					response: { ...state.test, questions: data }
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
				const data = getMockTest(testId);
				dispatch({
					type: constants.TESTS_GET_TEST_SUCCESS,
					response: data
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

export function getTests(search, page, order){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Тесты' });
		dispatch({ type: constants.TESTS_GET_TESTS });
		
		setTimeout(() => {
			const data = mockGetTests(search, page, order);
			dispatch({
				type: constants.TESTS_GET_TESTS_SUCCESS,
				search,
				page,
				order,
				...data
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
			const data = mockGetTests(search, page, order);
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
		});
	};
}

export function saveQuestion(testId, sectionId, questionId){
	return (dispatch, getState) => {
		const state = getState();
		// dispatch({ type: constants.TESTS_SAVE_TEST_QUESTION });
		
		setTimeout(() => {
			saveMockQuestion(testId, sectionId, questionId, state.question);
			dispatch(info('Вопрос сохранен в базу.'));
		});
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

export function addNewAnswer(){
	return dispatch => {
		setTimeout(() => {
			const answer = addMockNewAnswer();
			dispatch({
				type: constants.TESTS_ADD_NEW_ANSWER_SUCCESS,
				answer
			});
		}, 300);
	};
}

export function toggleOpenSection(testId, sectionId){
	return (dispatch, getState) => {
		dispatch({
			type: constants.TESTS_TOGGLE_OPEN_SECTION,
			testId,
			sectionId
		});
		
		const state = getState();
		dispatch({
			type: constants.APP_CHANGE_OPENED_TEST_SECTIONS,
			sections: state.test.sections
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

export function changeTestTab(tab){
	return {
		type: constants.APP_CHANGE_TEST_TAB,
		tab
	};
}