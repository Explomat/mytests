import changeField from './utils/changeField';
import constants from '../constants';

export default function test(state = {
	data: {
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
		sections: []
	},
	defaultData: {},
	templates: {},
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST:
			return {
				...state,
				isFetching: true
			};
		case constants.TESTS_GET_TEST_SUCCESS: {
			const { data } = action.response;
			return {
				...state,
				...action.response,
				defaultData: data,
				isFetching: false
			};
		}
		
		case constants.TESTS_RESET_TEST:
		case constants.TESTS_RESET_TEST_SUCCESS: {
			const { defaultData } = state;
			return {
				...state,
				data: defaultData
			};
		}
		
		case constants.TESTS_CHANGE_TEST_FIELD: {
			return {
				...state,
				data: changeField(state.data, action.key, action.value)
			};
		}
		
		case constants.TESTS_REMOVE_SECTION: {
			const { sections } = state.data;
			return {
				...state,
				data: {
					...state.data,
					sections: sections.filter(s => s.id !== action.sectionId)
				}
			};
		}
		
		case constants.TESTS_ADD_NEW_SECTION: {
			const { sections } = state.data;
			const { title } = state.templates.section;
			const sec = {
				...state.templates.section,
				id: sections.length,
				title: {
					...title,
					value: `Section № ${sections.length + 1}`
				},
				is_new: true
			};
			return {
				...state,
				data: {
					...state.data,
					sections: sections.concat([ sec ])
				}
			};
		}
		
		case constants.TESTS_TOGGLE_OPEN_SECTION: {
			const { sections } = state.data;
			
			return {
				...state,
				data: {
					...state.data,
					sections: sections.map(s => {
						return s.id === action.sectionId ?
							{ ...s, isOpen: !s.isOpen } :
							s;
					})
				}
			};
		}
		
		case constants.TESTS_CHANGE_FIELD_IN_SECTION: {
			const { sections } = state.data;
			
			return {
				...state,
				data: {
					...state.data,
					sections: sections.map(s => {
						return s.id === action.sectionId ?
							changeField(s, action.key, action.value) :
							s;
					})
				}
			};
		}

		default:
			return state;
	}
}

