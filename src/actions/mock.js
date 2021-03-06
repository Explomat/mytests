// import numberToWords from 'number-to-words';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
// import uuid from '../utils/uuid';
// import indexOf from 'lodash/indexOf';

const limitRows = 15;

const testStatuses = [
	{ payload: 'publish', text: 'Открытый' },
	{ payload: 'project', text: 'Проект' },
	{ payload: 'secret', text: 'Скрытый' }
];

const sectionOrders = [
	{ payload: 'Sequential', text: 'Последовательно' },
	{ payload: 'Random', text: 'Случайно' }
];

const questionTypes = [
	{ payload: 'multiple_choice', text: 'Единственный выбор' },
	{ payload: 'multiple_response', text: 'Множественный выбор' },
	{ payload: 'order', text: 'Ранжирование' },
	{ payload: 'gap_fill', text: 'Текстовый ввод' },
	{ payload: 'numerical_fill_in_blank', text: 'Цифровой ввод' },
	{ payload: 'match_item', text: 'Соответствие' }
];

const conditionGradingOptions = [
	{ payload: '=', text: '=' },
	{ payload: '&gt;', text: '>' },
	{ payload: '&lt;', text: '<' },
	{ payload: '&lt;=', text: '>=' },
	{ payload: '&gt;=', text: '>=' }
];

const conditionSentenceOption = [
	{ payload: 'equal', text: 'равно' },
	{ payload: 'contains', text: 'содержит' }
];

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomState(states){
	return states[getRandomArbitrary(0, states.length)].payload;
}

function filterTests(tests, search, page, order){
	const filteredTests = filter(tests,  t => {
		return (~t.title.value.indexOf(search));
	});
	const [key, orderBy] = order.split(':');
	const sortedTests = filteredTests.sort((f, s) => {
		if (orderBy === 'asc'){
			if (f[key].value < s[key].value){
				return -1;
			}
			if (f[key].value > s[key].value){
				return 1;
			}
			return 0;
		} else if (orderBy === 'desc') {
			if (f[key].value < s[key].value){
				return 1;
			}
			if (f[key].value > s[key].value){
				return -1;
			}
			return 0;
		}
	});
	
	const slicedTests = sortedTests.slice((page * limitRows),  (page * limitRows + limitRows));
	
	return {
		tests: slicedTests,
		pagesCount: Math.round(filteredTests.length / limitRows),
		count: filteredTests.length
	};
}

function mockTests(){
	const MAX_TESTS_COUNT = getRandomArbitrary(1, 31);

	const tests = [];
	for (let i = 0; i < MAX_TESTS_COUNT; i++) {
		const test = {
			id: i,
			code: {
				type: 'string',
				value: `code № ${i + 1}`,
				title: 'Код'
			},
			title: {
				type: 'string',
				value: `Test № ${i + 1}`,
				title: 'Название раздела'
			},
			passing_score: {
				type: 'integer',
				value: getRandomArbitrary(0, 20),
				title: 'Проходной балл'
			},
			duration: {
				type: 'integer',
				value: getRandomArbitrary(0, 120),
				title: 'Длительность (мин.)'
			},
			duration_days: {
				type: 'integer',
				value: getRandomArbitrary(0, 5),
				title: 'Продолжительность (дней)'
			},
			attempts_num: {
				type: 'integer',
				value: getRandomArbitrary(0, 5),
				title: 'Количество попыток'
			},
			status: {
				type: 'select',
				selected: getRandomState(testStatuses),
				title: 'Статус',
				values: testStatuses
			},
			is_open: {
				type: 'bool',
				value: false,
				title: 'Открытый тест (возможно самостоятельно назначить тест)'
			},
			not_sent_correct_answer: {
				type: 'bool',
				value: false,
				title: 'Не передавать проигрывателю информацию о правильных ответах на вопросы'
			},
			display_result: {
				type: 'bool',
				value: false,
				title: 'Показывать результаты теста (резюме по тесту)'
			},
			display_correct_answer: {
				type: 'bool',
				value: false,
				title: 'Показывать правильный ответ'
			},
			not_disp_last_attempt: {
				type: 'bool',
				value: false,
				title: 'Не показывать сообщение об исчерпании попыток ответа'
			},
			not_display_feedback: {
				type: 'bool',
				value: false,
				title: 'Не показывать в данном тесте сообщения обратной связи'
			},
			display_result_report: {
				type: 'bool',
				value: false,
				title: 'Показывать отчет о результатах теста'
			},
			display_answers_in_report: {
				type: 'bool',
				value: true,
				title: 'Показывать варианты ответов в отчете по тестированию'
			},
			display_correct_answer_in_report: {
				type: 'bool',
				value: true,
				title: 'Показывать правильный ответ в отчете по тестированию'
			},
			not_display_unfinished_score: {
				type: 'bool',
				value: false,
				title: 'Не показывать набранный балл для завершенных тестов'
			}
		};
		tests.push(test);
		
		const MAX_SECTIONS_COUNT = getRandomArbitrary(1, 5);
		const sections = [];
		for (let j = 0; j < MAX_SECTIONS_COUNT; j++){
			const section = {
				id: j,
				title: {
					type: 'string',
					value: `Section № ${j + 1}`,
					title: 'Название раздела'
				},
				order: {
					type: 'select',
					selected: getRandomState(sectionOrders),
					title: 'Порядок следования вопросов',
					values: sectionOrders
				}
			};
			sections.push(section);
			test.sections = sections;
			
			const MAX_QUESTIONS_COUNT = getRandomArbitrary(1, 6);
			const questions = [];
			for (let k = 0; k < MAX_QUESTIONS_COUNT; k++){
				const question = {
					id: k,
					title: {
						type: 'string',
						value: `Question № ${k + 1}`,
						title: 'Название вопроса'
					},
					type: {
						type: 'select',
						selected: getRandomState(questionTypes),
						title: 'Тип',
						values: questionTypes
					},
					question_points: { // Баллы
						type: 'real',
						value: getRandomArbitrary(1, 10),
						title: 'Баллы'
					}
				};
				questions.push(question);
				section.questions = questions;
				
				const MAX_ANSWERS_COUNT = getRandomArbitrary(1, 7);
				const answers = [];
				for (let p = 0; p < MAX_ANSWERS_COUNT; p++){
					const answer = {
						id: p,
						text: {
							type: 'string',
							value: `Answer № ${p + 1}`,
							title: 'Ответ'
						},
						is_correct_answer: {
							type: 'bool',
							value: getRandomArbitrary(0, 2),
							title: 'Правильный ответ'
						},
						condition: {
							value: {
								type: 'string',
								value: '',
								title: null
							},
							case_sensitive: {
								type: 'bool',
								value: false,
								title: 'Зависит от регистра'
							},
							grading_option_id: {
								type: 'select',
								selected: getRandomState(conditionGradingOptions),
								values: conditionGradingOptions
							},
							sentence_option_id: {
								type: 'select',
								selected: getRandomState(conditionSentenceOption),
								values: conditionSentenceOption
							}
						},
						value: { // Соответствие
							type: 'string',
							value: '',
							title: 'Соответствующий элемент'
						},
						ws_score: { // Вес
							type: 'string',
							value: getRandomArbitrary(1, 5),
							title: 'Вес'
						}
					};
					answers.push(answer);
					question.answers = answers;
				}
			}
		}
	}
	return tests;
}

const tests = mockTests();

export function getMockTests(search, page, order){
	const data = filterTests(tests, search, page, order);
	const _tests = data.tests.map(t => {
		return {
			id: t.id,
			title: t.title.value
		};
	});
	return {
		data: {
			tests: _tests,
			pages_count: data.pagesCount,
			count: data.count
		},
		templates: {
			test: {
				id: null,
				code: {
					type: 'string',
					value: '',
					title: 'Код'
				},
				title: {
					type: 'string',
					value: '',
					title: 'Название раздела'
				},
				passing_score: {
					type: 'integer',
					value: 0,
					title: 'Проходной балл'
				},
				duration: {
					type: 'integer',
					value: 0,
					title: 'Длительность (мин.)'
				},
				duration_days: {
					type: 'integer',
					value: 0,
					title: 'Продолжительность (дней)'
				},
				attempts_num: {
					type: 'integer',
					value: 1,
					title: 'Количество попыток'
				},
				status: {
					type: 'select',
					selected: testStatuses[0].payload,
					title: 'Статус',
					values: testStatuses
				},
				is_open: {
					type: 'bool',
					value: false,
					title: 'Открытый тест (возможно самостоятельно назначить тест)'
				},
				not_sent_correct_answer: {
					type: 'bool',
					value: false,
					title: 'Не передавать проигрывателю информацию о правильных ответах на вопросы'
				},
				display_result: {
					type: 'bool',
					value: false,
					title: 'Показывать результаты теста (резюме по тесту)'
				},
				display_correct_answer: {
					type: 'bool',
					value: false,
					title: 'Показывать правильный ответ'
				},
				not_disp_last_attempt: {
					type: 'bool',
					value: false,
					title: 'Не показывать сообщение об исчерпании попыток ответа'
				},
				not_display_feedback: {
					type: 'bool',
					value: false,
					title: 'Не показывать в данном тесте сообщения обратной связи'
				},
				display_result_report: {
					type: 'bool',
					value: false,
					title: 'Показывать отчет о результатах теста'
				},
				display_answers_in_report: {
					type: 'bool',
					value: true,
					title: 'Показывать варианты ответов в отчете по тестированию'
				},
				display_correct_answer_in_report: {
					type: 'bool',
					value: true,
					title: 'Показывать правильный ответ в отчете по тестированию'
				},
				not_display_unfinished_score: {
					type: 'bool',
					value: false,
					title: 'Не показывать набранный балл для завершенных тестов'
				}
			}
		}
	};
}

export function getMockTest(testId){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test){
		return {
			data: { ...test },
			templates: {
				section: {
					id: null,
					title: {
						type: 'string',
						value: '',
						title: 'Название раздела'
					},
					order: {
						type: 'select',
						selected: sectionOrders[0].payload,
						title: 'Порядок следования вопросов',
						values: sectionOrders
					},
					questions: []
				},
				question: {
					id: null,
					title: {
						type: 'string',
						value: '',
						title: 'Название вопроса'
					},
					type: {
						type: 'select',
						selected: questionTypes[0].payload,
						title: 'Тип',
						values: questionTypes
					},
					question_points: { // Баллы
						type: 'real',
						value: 0,
						title: 'Баллы'
					},
					answers: []
				}
			}
		};
	}
}

export function saveMockTest(testId, test){
	const testIndex = findIndex(tests, t => t.id.toString() === testId.toString());
	if (testIndex !== -1){
		tests[testIndex] = test.data;
	}
}

export function getMockQuestion(testId, sectionId, questionId){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test){
		const section = test.sections.filter(s => s.id.toString() === sectionId.toString())[0];
		if (section){
			const question = section.questions.filter(q => q.id.toString() === questionId.toString())[0];
			if (question){
				return {
					data: question,
					templates: {
						answer: {
							id: null,
							text: {
								type: 'string',
								value: '',
								title: 'Ответ'
							},
							is_correct_answer: {
								type: 'bool',
								value: false,
								title: 'Правильный ответ'
							},
							condition: {
								value: {
									type: 'string',
									value: '',
									title: null
								},
								case_sensitive: {
									type: 'bool',
									value: false,
									title: 'Зависит от регистра'
								},
								grading_option_id: {
									type: 'select',
									selected: conditionGradingOptions[0].payload,
									values: conditionGradingOptions
								},
								sentence_option_id: {
									type: 'select',
									selected: conditionSentenceOption[0].payload,
									values: conditionSentenceOption
								}
							},
							value: { // Соответствие
								type: 'string',
								value: '',
								title: 'Соответствующий элемент'
							},
							ws_score: { // Вес
								type: 'string',
								value: 0,
								title: 'Вес'
							}
						}
					}
				};
			}
		}
	}
	return {
		error: 'Ошибка при получении данных!'
	};
}

export function saveMockQuestion(testId, sectionId, questionId, question) {
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test){
		const section = test.sections.filter(s => s.id.toString() === sectionId.toString())[0];
		if (section){
			const qId = (questionId === null || questionId === undefined) ? -1 : questionId;
			const questionIdx = findIndex(section.questions, q => q.id.toString() === qId.toString());
			if (questionIdx === -1) {
				section.questions.push(question);
			} else {
				section.questions[questionIdx] = question;
			}
		}
	}
}

export function getMockQuestions(testId){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test) {
		return test.questions;
	}
	return [];
}

export function addMockNewQuestion(testId, sectionId){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test) {
		const section = test.sections.filter(s => s.id.toString() === sectionId.toString())[0];
		if (section){
			const id = section.questions.length + 1;
			const question = {
				id,
				title: {
					type: 'string',
					value: `Question № ${id}`,
					title: 'Название вопроса'
				},
				type: {
					type: 'select',
					selected: questionTypes[0].payload,
					title: 'Тип',
					values: questionTypes
				},
				question_points: { // Баллы
					type: 'real',
					value: 0,
					title: 'Баллы'
				},
				answers: []
			};
			section.questions.push(question);
			return question;
		}
	}
}

export function editMockTest(testId, test){
	const testIdx = findIndex(tests, q => q.id.toString() === testId.toString());
	tests[testIdx] = test;
}

export function editMockSection(testId, sectionId, section){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test){
		const sectionIdx = findIndex(test.sections, s => s.id.toString() === sectionId.toString());
		test.sections[sectionIdx] = section;
	}
}