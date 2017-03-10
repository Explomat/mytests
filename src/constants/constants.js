import keyMirror from 'keyMirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_GET_ACCESS',
	'TESTS_GET_TESTS',
	'TESTS_GET_TESTS_ON_SCROLL',
	'TESTS_GET_TEST',
	'TESTS_GET_TEST_QUESTION'
]);

const constants = keyMirror({
	'APP_CHANGE_TITLE': null,
	'APP_ERROR_MESSAGE': null,
	'APP_INFO_MESSAGE': null,
	'APP_CHANGE_TEST_TAB': null,
	'APP_CHANGE_OPENED_TEST_SECTIONS': null,
	'TESTS_TOGGLE_OPEN_SECTION': null,
	'TESTS_CHANGE_TEST_FIELD': null,
	'TESTS_CHANGE_FIELD_IN_SECTION': null,
	'TESTS_CHANGE_QUESTION_FIELD': null
});

export default merge(remoteConstants, constants);