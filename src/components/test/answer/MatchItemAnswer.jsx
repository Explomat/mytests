import React, { Component } from 'react';
import { TextView } from '../../modules/text-label';
import InputReal from '../../modules/input-real';

class MatchItemAnswer extends Component {
	
	render(){
		const {
			text,
			ws_score,
			displayWsScore,
			value
		} = this.props;
		return (
			<div className='match-item__answer'>
				<TextView
					value={text.value}
					placeholder={text.title}
					onBlur={val => this.handleChangeField('text', val)}
				/>
				{displayWsScore &&
					<InputReal
						value={ws_score.value}
						title={ws_score.title}
						className='form-control'
						onChange={val => this.handleChangeField('ws_score', val)}
					/>
				}
				<TextView
					value={value.value}
					placeholder={value.title}
					onBlur={val => this.handleChangeField('value', val)}
				/>
			</div>
		);
	}
}

export default MatchItemAnswer;