import React, { Component } from 'react';
import Section from './Section';

class Test extends Component {
	render(){
		const { title, sections } = this.props;
		return (
			<div className='test'>
				<div className='test__title'>{title}</div>
				{sections && sections.map(s => <Section key={s.id} {...s} />)}
			</div>
		);
	}
}


export default Test;