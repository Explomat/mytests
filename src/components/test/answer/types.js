// Единственный выбор
export function _isMultipleChoice(type){
	return type === 'multiple_choice';
}

// Множественный выбор
export function _isMultipleResponse(type){
	return type === 'multiple_response';
}

// Ранжирование
export function _isOrder(type){
	return type === 'order';
}

// Текстовый ввод
export function _isGapFill(type){
	return type === 'gap_fill';
}

// Цифровой ввод
export function _isNumericalFillInBlank(type){
	return type === 'numerical_fill_in_blank';
}

// Соответствие
export function _isMatchItem(type){
	return type === 'match_item';
}