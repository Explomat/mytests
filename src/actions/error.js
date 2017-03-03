import constants from '../constants';

export default function error(err){
	return {
		type: constants.APP_ERROR_MESSAGE,
		error: err
	};
}