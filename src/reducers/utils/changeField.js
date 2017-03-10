export default function changeField(state, key, value){
	if (!(key in state)) return state;
	
	const field = state[key];
	if (!field.type) return state;
	
	if (field.type === 'select'){
		const newState = { ...state, [key]: { ...field, selected: value } };
		return newState;
	}
	return { ...state, [key]: { ...field, value } };
}