import constants from '../constants';
import assign from 'lodash/assign';
// import filter from 'lodash/filter';
// import findIndex from 'lodash/findIndex';

function isFetchingTest(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST){
		return true;
	}
	return false;
}

/* function section(state = {
	id: null,
	title: {},
	order: {},
	isOpen: false
}, action) {
	switch (action.type) {
		case constants.TESTS_TOGGLE_OPEN_SECTION:
			return assign({}, state, { isOpen: !state.isOpen });
		default:
			return state;
	}
}*/

function changeTestField(state, key, value){
	if (!(key in state)) return state;
	
	const field = state[key];
	if (!field.type) return state;
	
	if (field.type === 'select'){
		const newState = { ...state, [key]: { ...field, selected: value } };
		return newState;
	}
	return { ...state, [key]: { ...field, value } };
}

export default function test(state = {
	id: null,
	code: {},
	title: {},
	passing_score: {},
	duration: {},
	duration_days: {},
	attempts_num: {},
	status: {}, // Статус
	is_open: {}, // Открытый тест (возможно самостоятельно назначить тест)
	not_sent_correct_answer: {}, // Не передавать проигрывателю информацию о правильных ответах на вопросы
	display_result: {}, // Показывать результаты теста (резюме по тесту)
	display_correct_answer: {}, // Показывать правильный ответ
	not_disp_last_attempt: {}, // Не показывать сообщение об исчерпании попыток ответа
	not_display_feedback: {}, // Не показывать в данном тесте сообщения обратной связи
	display_result_report: {}, // Показывать отчет о результатах теста
	display_answers_in_report: {}, // Показывать варианты ответов в отчете по тестированию
	display_correct_answer_in_report: {}, // Показывать правильный ответ в отчете по тестированию,
	not_display_unfinished_score: {}, // Не показывать набранный балл для завершенных тестов,
	sections: [],
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST:
		case constants.TESTS_GET_TEST_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingTest(state.isFetching, action) });
			
		case constants.TESTS_CHANGE_TEST_FIELD: {
			return changeTestField(state, action.key, action.value);
		}
		
		case constants.TESTS_TOGGLE_OPEN_SECTION: {
			const { sections } = state;
			
			return {
				...state,
				sections: sections.map(s => {
					return s.id === action.sectionId ?
						{ ...s, isOpen: !s.isOpen } :
						s;
				})
			};
		}

		default:
			return state;
	}
}

