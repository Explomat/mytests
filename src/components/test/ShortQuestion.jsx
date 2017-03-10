import React, { Component } from 'react';
// import Answer from './Answer';

class ShortQuestion extends Component {
	
	render(){
		const title = this.props.title || {};
		const { link } = this.props;
		return (
			<div className='short-question'>
				<a href={link} className='short-question__title'>Question - {title.value}</a>
			</div>
		);
	}
}

export default ShortQuestion;