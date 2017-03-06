import keyMirror from 'keyMirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_GET_ACCESS',
	'TESTS_GET_TESTS',
	'TESTS_GET_TESTS_ON_SCROLL',
	'TESTS_GET_TEST'
]);

const constants = keyMirror({
	'APP_CHANGE_TITLE': null,
	'APP_ERROR_MESSAGE': null
});

export default merge(remoteConstants, constants);