import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingTest(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST){
		return true;
	}
	return false;
}

export default function test(state = {
	id: null,
	code: null,
	title: '',
	passing_score: '',
	duration: '',
	duration_days: '',
	attempts_num: '',
	is_open: false, // Открытый тест (возможно самостоятельно назначить тест)
	not_sent_correct_answer: false, // Не передавать проигрывателю информацию о правильных ответах на вопросы
	display_result: false, // Показывать результаты теста (резюме по тесту)
	display_correct_answer: false, // Показывать правильный ответ
	not_disp_last_attempt: false, // Не показывать сообщение об исчерпании попыток ответа
	not_display_feedback: false, // Не показывать в данном тесте сообщения обратной связи
	display_result_report: false, // Показывать отчет о результатах теста
	display_answers_in_report: false, // Показывать варианты ответов в отчете по тестированию
	display_correct_answer_in_report: false, // Показывать правильный ответ в отчете по тестированию,
	not_display_unfinished_score: false, // Не показывать набранный балл для завершенных тестов
	test_finish_redirect: 'active_test_learning',
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST:
		case constants.TESTS_GET_TEST_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingTest(state.isFetching, action) });

		default:
			return state;
	}
}

