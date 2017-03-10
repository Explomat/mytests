'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // import numberToWords from 'number-to-words';


exports.mockGetTests = mockGetTests;
exports.getMockTest = getMockTest;
exports.getMockQuestion = getMockQuestion;
exports.saveMockQuestion = saveMockQuestion;
exports.getMockQuestions = getMockQuestions;
exports.editMockTest = editMockTest;
exports.editMockSection = editMockSection;

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import indexOf from 'lodash/indexOf';

var limitRows = 15;

var testStatuses = [{ payload: 'publish', text: 'Открытый' }, { payload: 'project', text: 'Проект' }, { payload: 'secret', text: 'Скрытый' }];

var sectionOrders = [{ payload: 'Sequential', text: 'Последовательно' }, { payload: 'Random', text: 'Случайно' }];

var questionTypes = [{ payload: 'multiple_choice', text: 'Единственный выбор' }, { payload: 'multiple_response', text: 'Множественный выбор' }, { payload: 'order', text: 'Ранжирование' }, { payload: 'gap_fill', text: 'Текстовый ввод' }, { payload: 'numerical_fill_in_blank', text: 'Цифровой ввод' }, { payload: 'match_item', text: 'Соответствие' }];

var conditionGradingOptions = [{ payload: '=', text: '=' }, { payload: '&gt;', text: '&gt;' }, { payload: '&lt;', text: '&lt;' }, { payload: '&lt;=', text: '&lt;=' }, { payload: '&gt;=', text: '&gt;=' }];

var conditionSentenceOption = [{ payload: 'equal', text: 'равно' }, { payload: 'contains', text: 'содержит' }];

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomState(states) {
	return states[getRandomArbitrary(0, states.length)].payload;
}

function filterTests(tests, search, page, order) {
	var filteredTests = (0, _filter2.default)(tests, function (t) {
		return ~t.title.value.indexOf(search);
	});

	var _order$split = order.split(':'),
	    _order$split2 = _slicedToArray(_order$split, 2),
	    key = _order$split2[0],
	    orderBy = _order$split2[1];

	var sortedTests = filteredTests.sort(function (f, s) {
		if (orderBy === 'asc') {
			if (f[key].value < s[key].value) {
				return -1;
			}
			if (f[key].value > s[key].value) {
				return 1;
			}
			return 0;
		} else if (orderBy === 'desc') {
			if (f[key].value < s[key].value) {
				return 1;
			}
			if (f[key].value > s[key].value) {
				return -1;
			}
			return 0;
		}
	});

	var slicedTests = sortedTests.slice(page * limitRows, page * limitRows + limitRows);

	return {
		tests: slicedTests,
		pagesCount: Math.round(filteredTests.length / limitRows),
		count: filteredTests.length
	};
}

function mockTests() {
	var MAX_TESTS_COUNT = getRandomArbitrary(1, 31);

	var tests = [];
	for (var i = 0; i < MAX_TESTS_COUNT; i++) {
		var test = {
			id: i,
			code: {
				type: 'string',
				value: 'code \u2116 ' + (i + 1),
				title: 'Код'
			},
			title: {
				type: 'string',
				value: 'Test \u2116 ' + (i + 1),
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

		var MAX_SECTIONS_COUNT = getRandomArbitrary(1, 5);
		var sections = [];
		for (var j = 0; j < MAX_SECTIONS_COUNT; j++) {
			var section = {
				id: j,
				title: {
					type: 'string',
					value: 'Section \u2116 ' + (j + 1),
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

			var MAX_QUESTIONS_COUNT = getRandomArbitrary(1, 6);
			var questions = [];
			for (var k = 0; k < MAX_QUESTIONS_COUNT; k++) {
				var question = {
					id: k,
					title: {
						type: 'string',
						value: 'Question \u2116 ' + (k + 1),
						title: 'Название вопроса'
					},
					weight: {
						type: 'integer',
						value: getRandomArbitrary(1, 10),
						title: 'Вес вопроса'
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

				var MAX_ANSWERS_COUNT = getRandomArbitrary(1, 7);
				var answers = [];
				for (var p = 0; p < MAX_ANSWERS_COUNT; p++) {
					var answer = {
						id: p,
						text: {
							type: 'string',
							value: 'Answer \u2116 ' + (p + 1),
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

var tests = mockTests();

function mockGetTests(search, page, order) {
	var data = filterTests(tests, search, page, order);
	var _tests = data.tests.map(function (t) {
		return {
			id: t.id,
			title: t.title.value
		};
	});
	return {
		tests: _tests,
		pages_count: data.pagesCount,
		count: data.count
	};
}

function getMockTest(testId) {
	return tests.filter(function (t) {
		return t.id.toString() === testId.toString();
	})[0];
}

function getMockQuestion(testId, sectionId, questionId) {
	var test = tests.filter(function (t) {
		return t.id.toString() === testId.toString();
	})[0];
	if (test) {
		var section = test.sections.filter(function (s) {
			return s.id.toString() === sectionId.toString();
		})[0];
		if (section) {
			var question = section.questions.filter(function (q) {
				return q.id.toString() === questionId.toString();
			})[0];
			if (question) {
				return question;
			}
		}
	}
	return {
		error: 'Ошибка при получении данных!'
	};
}

function saveMockQuestion(testId, sectionId, questionId, question) {
	var test = tests.filter(function (t) {
		return t.id.toString() === testId.toString();
	})[0];
	if (test) {
		var section = test.sections.filter(function (s) {
			return s.id.toString() === sectionId.toString();
		})[0];
		if (section) {
			var qId = questionId === null || questionId === undefined ? -1 : questionId;
			var questionIdx = (0, _findIndex2.default)(section.questions, function (q) {
				return q.id.toString() === qId.toString();
			});
			if (questionIdx === -1) {
				section.questions.push(question);
			} else {
				section.questions[questionIdx] = question;
			}
		}
	}
}

function getMockQuestions(testId) {
	var test = tests.filter(function (t) {
		return t.id.toString() === testId.toString();
	})[0];
	if (test) {
		return test.questions;
	}
	return [];
}

function editMockTest(testId, test) {
	var testIdx = (0, _findIndex2.default)(tests, function (q) {
		return q.id.toString() === testId.toString();
	});
	tests[testIdx] = test;
}

function editMockSection(testId, sectionId, section) {
	var test = tests.filter(function (t) {
		return t.id.toString() === testId.toString();
	})[0];
	if (test) {
		var sectionIdx = (0, _findIndex2.default)(test.sections, function (s) {
			return s.id.toString() === sectionId.toString();
		});
		test.sections[sectionIdx] = section;
	}
}
