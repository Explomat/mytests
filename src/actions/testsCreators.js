/* import { get } from '../utils/ajax';
import { url } from '../config';*/
import constants from '../constants';
// import error from './error';
import { mockGetTests, getMockTest, getMockQuestion } from './mock';

export function getTest(testId){
	return (dispatch) => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Тест' });
		dispatch({ type: constants.TESTS_GET_TEST });
		
		/* const state = getState();
		if (state.test && state.test.id !== null && state.test.id.toString() === testId.toString()){
			dispatch({
				type: constants.TESTS_GET_TEST_SUCCESS,
				response: state.test
			});
			return;
		}*/
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

export function changeTestTab(tab){
	return {
		type: constants.APP_CHANGE_TEST_TAB,
		tab
	};
}