import constants from '../constants';
import { setSuccess, setFailure } from './utils/setState';
import assign from 'lodash/assign';

export default function app(state = {
	title: 'Тесты',
	access: false,
	isFetching: false,
	errorMessage: null,
	infoMessage: null,
	openedTestSections: [],
	selectedTestTab: 'settings'
}, action) {
	switch (action.type) {
		case constants.APP_GET_ACCESS:
			return assign({}, state, { isFetching: true });
		case constants.APP_GET_ACCESS_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.APP_GET_ACCESS_SUCCESS:
			return setSuccess(state, action.response, 'error', 'isFetching');
			
		case constants.APP_ERROR_MESSAGE:
			return assign({}, state, { isFetching: false, errorMessage: action.errorMessage });
		case constants.APP_INFO_MESSAGE:
			return assign({}, state, { isFetching: false, infoMessage: action.infoMessage });
		case constants.APP_CHANGE_TITLE:
			return assign({}, state, { title: action.title });
		
		case constants.APP_CHANGE_TEST_TAB:
			return assign({}, state, { selectedTestTab: action.tab });
		case constants.APP_CHANGE_OPENED_TEST_SECTIONS: {
			return assign({}, state, {
				openedTestSections: (action.sections || []).filter(s => s.isOpen).map(s => s.id)
			});
		}
		default:
			return state;
	}
}

