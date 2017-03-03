import React, { PropTypes } from 'react';
import NumericInput from 'react-numeric-input';

import './style/input-real.scss';

const InputReal = ({ value, title, ...props }) => {
	return (
		<div className='input-real'>
			<span className='input-real__title'>{title}</span>
			<NumericInput
				value={value}
				precision={2}
				step={0.1}
				mobile={false}
				autoCorrect='on'
				placeholder='Введите дробное число'
				{...props}
			/>
		</div>
	);
};

InputReal.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string.isRequired
};

InputReal.defaultProps = {
	value: ''
};

export default InputReal;
