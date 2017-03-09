import React, { Component } from 'react';
// import Answer from './Answer';

class ShortQuestion extends Component {
	
	render(){
		const title = this.props.title || {};
		const { link } = this.props;
		// const { answers } = this.props;
		return (
			<div className='question'>
				<a href={link} className='question__title'>Question - {title.value}</a>
				{/* <div className='answers'>
					{answers && answers.map(a => <Answer key={a.id} {...a} />)}
				</div>*/}
			</div>
		);
	}
}

export default ShortQuestion;