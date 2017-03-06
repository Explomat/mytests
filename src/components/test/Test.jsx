import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import Section from './Section';

class Test extends Component {
	render(){
		const title = this.props.title || {};
		const { sections } = this.props;
		return (
			<div className='test'>
				<TextView
					className='test__title'
					value={title.value}
					placeholder={title.title}
				/>
				<div className='sections'>
					{sections && sections.map(s => <Section key={s.id} {...s} />)}
				</div>
			</div>
		);
	}
}


export default Test;