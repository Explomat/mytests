import React, { PropTypes } from 'react';
import Checkbox from '../../checkbox';
import { TextView } from '../../text-label';
import DropDown from '../../dropdown';
import InputNumber from '../../input-number';
import InputReal from '../../input-real';
import InputCalendar from '../../input-calendar';

const CastComponent = ({ type, ...props }) => {
	let MyComponent = null;
	switch (type){
		case 'bool':
			MyComponent = <Checkbox {...props} />;
			break;
		case 'string':
			MyComponent = <TextView {...props} />;
			break;
		case 'integer':
			MyComponent = <InputNumber {...props} />;
			break;
		case 'real':
			MyComponent = <InputReal {...props} />;
			break;
		case 'select':
			MyComponent = <DropDown {...props} />;
			break;
		case 'time':
			MyComponent = <InputCalendar displayDate={false} {...props} />;
			break;
		case 'date':
			MyComponent = <InputCalendar displayTime={false} {...props} />;
			break;
		case 'datetime':
			MyComponent = <InputCalendar {...props} />;
			break;
		default:
			MyComponent = null;
	}
	return MyComponent;
};

CastComponent.propTypes = {
	type: PropTypes.string
};

export default CastComponent;