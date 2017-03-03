// import numberToWords from 'number-to-words';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
// import indexOf from 'lodash/indexOf';

const limitRows = 15;

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
	{ payload: '&gt;', text: '&gt;' },
	{ payload: '&lt;', text: '&lt;' },
	{ payload: '&lt;=', text: '&lt;=' },
	{ payload: '&gt;=', text: '&gt;=' }
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
		return (~t.title.indexOf(search));
	});
	const [key, orderBy] = order.split(':');
	const sortedTests = filteredTests.sort((f, s) => {
		if (orderBy === 'asc'){
			if (f[key] < s[key]){
				return -1;
			}
			if (f[key] > s[key]){
				return 1;
			}
			return 0;
		} else if (orderBy === 'desc') {
			if (f[key] < s[key]){
				return 1;
			}
			if (f[key] > s[key]){
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
			title: `Test № ${i + 1}`
		};
		tests.push(test);
		
		const MAX_SECTIONS_COUNT = getRandomArbitrary(1, 5);
		const sections = [];
		for (let j = 0; j < MAX_SECTIONS_COUNT; j++){
			const section = {
				id: j,
				title: `Section № ${j + 1}`,
				order: getRandomState(sectionOrders),
				sectionOrders
			};
			sections.push(section);
			test.sections = sections;
			
			const MAX_QUESTIONS_COUNT = getRandomArbitrary(1, 6);
			const questions = [];
			for (let k = 0; k < MAX_QUESTIONS_COUNT; k++){
				const question = {
					id: k,
					title: `Question № ${k + 1}`,
					weight: getRandomArbitrary(1, 10),
					type: getRandomState(questionTypes),
					questionTypes,
					conditionGradingOptions,
					conditionSentenceOption
				};
				questions.push(question);
				section.questions = questions;
				
				const MAX_ANSWERS_COUNT = getRandomArbitrary(1, 7);
				const answers = [];
				for (let p = 0; p < MAX_ANSWERS_COUNT; p++){
					const answer = {
						id: p,
						text: `Answer № ${p + 1}`,
						weight: 0,
						condition: {
							grading_option_id: getRandomState(conditionGradingOptions),
							sentence_option_id: getRandomState(conditionSentenceOption)
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

export function mockGetTests(search, page, order){
	const data = filterTests(tests, search, page, order);
	const _tests = data.tests.map(t => {
		return {
			id: t.id,
			title: t.title
		};
	});
	return {
		tests: _tests,
		pages_count: data.pagesCount,
		count: data.count
	};
}

export function getMockTest(testId){
	return tests.filter(t => t.id.toString() === testId.toString())[0];
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

export function editMockQuestion(testId, sectionId, questionId, question){
	const test = tests.filter(t => t.id.toString() === testId.toString())[0];
	if (test){
		const section = test.sections.filter(s => s.id.toString() === sectionId.toString());
		if (section){
			const questionIdx = findIndex(section.questions, q => q.id.toString() === questionId.toString());
			section.questions[questionIdx] = question;
		}
	}
}