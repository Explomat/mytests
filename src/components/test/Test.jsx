import React, { Component } from 'react';
import { TextView } from '../modules/text-label';
import InputNumber from '../modules/input-number';
import Checkbox from '../modules/checkbox';
import SectionContainer from '../../containers/SectionContainer';

class Test extends Component {
	render(){
		const code = this.props.code || {};
		const title = this.props.title || {};
		const passing_score = this.props.passing_score || {};
		const duration = this.props.duration || {};
		const duration_days = this.props.duration_days || {};
		const attempts_num = this.props.attempts_num || {};
		
		const is_open = this.props.is_open || {};
		const not_sent_correct_answer = this.props.not_sent_correct_answer || {};
		const display_result = this.props.display_result || {};
		const display_correct_answer = this.props.display_correct_answer || {};
		const not_disp_last_attempt = this.props.not_disp_last_attempt || {};
		const not_display_feedback = this.props.not_display_feedback || {};
		const display_result_report = this.props.display_result_report || {};
		const display_answers_in_report = this.props.display_answers_in_report || {};
		const display_correct_answer_in_report = this.props.display_correct_answer_in_report || {};
		const not_display_unfinished_score = this.props.not_display_unfinished_score || {};
		
		const { id, sections } = this.props;
		return (
			<div className='test col-sm-5 col-md-4 col-lg-3'>
				<div className='test_all-settings'>
					<TextView
						className='test__code'
						value={code.value}
						placeholder={code.title}
					/>
					<TextView
						className='test__title'
						value={title.value}
						placeholder={title.title}
					/>
					<InputNumber value={passing_score.value} title={passing_score.title} className='form-control' />
					<InputNumber value={duration.value} title={duration.title} className='form-control' />
					<InputNumber value={duration_days.value} title={duration_days.title} className='form-control' />
					<InputNumber value={attempts_num.value} title={attempts_num.title} className='form-control' />
					
					<Checkbox checked={is_open.value} label={is_open.title} />
					<Checkbox checked={not_sent_correct_answer.value} label={not_sent_correct_answer.title} />
					<Checkbox checked={display_result.value} label={display_result.title} />
					<Checkbox checked={display_correct_answer.value} label={display_correct_answer.title} />
					<Checkbox checked={not_disp_last_attempt.value} label={not_disp_last_attempt.title} />
					<Checkbox checked={not_display_feedback.value} label={not_display_feedback.title} />
					<Checkbox checked={display_result_report.value} label={display_result_report.title} />
					<Checkbox checked={display_answers_in_report.value} label={display_answers_in_report.title} />
					<Checkbox checked={display_correct_answer_in_report.value} label={display_correct_answer_in_report.title} />
					<Checkbox checked={not_display_unfinished_score.value} label={not_display_unfinished_score.title} />
				</div>
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
			</div>
		);
	}
}


export default Test;