import React, { PropTypes } from 'react';
import NumericInput from 'react-numeric-input';

import './style/input-number.scss';

const InputNumber = ({ value, title, ...props }) => {
	return (
		<div className='input-number'>
			{title && <span className='input-number__title'>{title}</span>}
			<NumericInput
				value={value}
				step={1}
				mobile={false}
				autoCorrect='on'
				placeholder='Введите число'
				{...props}
			/>
		</div>
	);
};

InputNumber.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string
};

InputNumber.defaultProps = {
	value: ''
};

export default InputNumber;