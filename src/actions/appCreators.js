// import { get } from '../utils/ajax';
// import { url } from '../config';
import constants from '../constants';
// import error from './error';

export function getAccess(){
	return dispatch => {
		dispatch({ type: constants.APP_GET_ACCESS });
		
		setTimeout(() => {
			dispatch({
				type: constants.APP_GET_ACCESS_SUCCESS,
				response: { access: true }
			});
		}, 300);
		/* const path = url.createPath({ server_name: 'mytests', action_name: 'Access' });
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: data });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}