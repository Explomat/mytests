import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import InputNumber from '../modules/input-number';
import DropDown from '../modules/dropdown';
import Checkbox from '../modules/checkbox';
import SectionContainer from '../../containers/SectionContainer';

class Test extends Component {
	
	constructor(props){
		super(props);
		
		this._renderSettings = this._renderSettings.bind(this);
		this._renderSections = this._renderSections.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
		this.tabs = {
			settings: this._renderSettings,
			sections: this._renderSections
		};
	}
	
	handleChangeField(key, value){
		this.props.changeTestField(key, value);
	}
	
	_renderSettings(){
		const {
			code,
			title,
			passing_score,
			duration,
			duration_days,
			attempts_num,
			status,
			is_open,
			not_sent_correct_answer,
			display_result,
			display_correct_answer,
			not_disp_last_attempt,
			not_display_feedback,
			display_result_report,
			display_answers_in_report,
			display_correct_answer_in_report,
			not_display_unfinished_score
		} = this.props;
		return (
			<div className='test_all-settings'>
				<TextView
					className='test__code'
					value={code.value}
					placeholder={code.title}
					onBlur={val => this.handleChangeField('code', val)}
				/>
				<TextView
					className='test__title'
					value={title.value}
					placeholder={title.title}
					onBlur={val => this.handleChangeField('title', val)}
				/>
				<InputNumber
					value={passing_score.value}
					title={passing_score.title}
					className='form-control'
					onChange={val => this.handleChangeField('passing_score', val)}
				/>
				<InputNumber
					value={duration.value}
					title={duration.title}
					className='form-control'
					onChange={val => this.handleChangeField('duration', val)}
				/>
				<InputNumber
					value={duration_days.value}
					title={duration_days.title}
					className='form-control'
					onChange={val => this.handleChangeField('duration_days', val)}
				/>
				<InputNumber
					value={attempts_num.value}
					title={attempts_num.title}
					className='form-control'
					onChange={val => this.handleChangeField('attempts_num', val)}
				/>
				
				<DropDown
					items={status.values}
					selectedPayload={status.selected}
					title={status.title}
					onChange={(e, val) => this.handleChangeField('status', val)}
				/>
				
				<Checkbox
					checked={is_open.value}
					label={is_open.title}
					onChange={val => this.handleChangeField('is_open', val)}
				/>
				<Checkbox
					checked={not_sent_correct_answer.value}
					label={not_sent_correct_answer.title}
					onChange={val => this.handleChangeField('not_sent_correct_answer', val)}
				/>
				<Checkbox
					checked={display_result.value}
					label={display_result.title}
					onChange={val => this.handleChangeField('display_result', val)}
				/>
				<Checkbox
					checked={display_correct_answer.value}
					label={display_correct_answer.title}
					onChange={val => this.handleChangeField('display_correct_answer', val)}
				/>
				<Checkbox
					checked={not_disp_last_attempt.value}
					label={not_disp_last_attempt.title}
					onChange={val => this.handleChangeField('not_disp_last_attempt', val)}
				/>
				<Checkbox
					checked={not_display_feedback.value}
					label={not_display_feedback.title}
					onChange={val => this.handleChangeField('not_display_feedback', val)}
				/>
				<Checkbox
					checked={display_result_report.value}
					label={display_result_report.title}
					onChange={val => this.handleChangeField('display_result_report', val)}
				/>
				<Checkbox
					checked={display_answers_in_report.value}
					label={display_answers_in_report.title}
					onChange={val => this.handleChangeField('display_answers_in_report', val)}
				/>
				<Checkbox
					checked={display_correct_answer_in_report.value}
					label={display_correct_answer_in_report.title}
					onChange={val => this.handleChangeField('display_correct_answer_in_report', val)}
				/>
				<Checkbox
					checked={not_display_unfinished_score.value}
					label={not_display_unfinished_score.title}
					onChange={val => this.handleChangeField('not_display_unfinished_score', val)}
				/>
			</div>
		);
	}
	
	_renderSections(){
		const { id, sections } = this.props;
		return (
			<div className='test__sections'>
				<div className='sections'>
					{sections && sections.map(s =>
						<SectionContainer
							key={s.id}
							testId={id}
							{...s}
						/>)
					}
				</div>
			</div>
		);
	}
	
	render(){
		const { selectedTestTab } = this.props;
		
		return (
			<div className='test col-sm-5 col-md-4 col-lg-3'>
				<button type='button' onClick={() => this.props.changeTestTab('settings')}>Общие настройки</button>
				<button type='button' onClick={() => this.props.changeTestTab('sections')}>Разделы</button>
				{this.tabs[selectedTestTab]()}
			</div>
		);
	}
}


export default Test;