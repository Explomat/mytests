import React from 'react';
import { BlankLink } from './modules/blank-link';

const Test = ({ id, title }) => {
	return (
		<div className='test'>
			<BlankLink hash={`#tests/${id}`} className='no-link test__link'>
				<div className='test__title'>{title}</div>
			</BlankLink>
		</div>
	);
};

const Tests = ({ tests }) => {
	return (
		<div className='tests'>
			{tests.map(v => <Test key={v.id} {...v} />)}
		</div>
	);
};


export default Tests;