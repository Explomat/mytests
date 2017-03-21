import keyMirror from 'keyMirror';
	
const questionTypes = keyMirror({
	multiple_choice: null,
	multiple_response: null,
	order: null,
	gap_fill: null,
	numerical_fill_in_blank: null,
	match_item: null
});

export default questionTypes;