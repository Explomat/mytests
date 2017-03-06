import React, { Component, PropTypes } from 'react';
import { TextView } from '../../text-label';
import InputMoment from '../../input-moment';
import cx from 'classnames';
import clickOutSide from 'react-onclickoutside';

import moment from 'moment';
moment.locale('ru');

import './style/input-calendar.scss';

class InputCalendar extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			isShow: false
		};
		
		this.handleToogle = this.handleToogle.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleToogle(){
		this.setState({ isShow: !this.state.isShow });
	}

	handleClickOutside() {
		this.setState({ isShow: false });
	}

	handleSave(_moment){
		this.handleToogle();
		if (this.props.onSave){
			this.props.onSave(_moment.format());
		}
	}
	
	render() {
		const { isShow } = this.state;
		const { className, placeholder, date, prevMonthIcon, nextMonthIcon } = this.props;
		const { displayDate, displayTime } = this.props;
		
		const displayDateAndTime = displayDate && displayTime;
		const dateTimeValue = displayDateAndTime ?
			moment(date).format('LLL') : displayDate ?
			moment(date).format('LL') : moment(date).format('hh:mm');
		const iconClasses = cx({
			'icon-clock-o': displayTime,
			'icon-calendar': displayDate,
			'input-calendar__icon': true
		});
		return (
			<div className={cx('input-calendar', className)}>
				<TextView
					onClick={this.handleToogle}
					inputClassName='input-calendar__date'
					value={dateTimeValue}
					placeholder={placeholder}
					readOnly
				/>
				<i className={iconClasses} onClick={this.handleToogle} />
				<div className={cx({ 'input-calendar__calendar': true, 'input-calendar__calendar--show': isShow })}>
					<InputMoment
						moment={moment(date)}
						onChange={this.props.onChange}
						onSave={this.handleSave}
						prevMonthIcon={prevMonthIcon}
						nextMonthIcon={nextMonthIcon}
						displayDate={displayDate}
						displayTime={displayTime}
					/>
				</div>
			</div>
		);
	}
}

InputCalendar.defaultProps = {
	displayDate: true,
	displayTime: true
};

InputCalendar.propTypes = {
	displayDate: PropTypes.bool,
	displayTime: PropTypes.bool,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	date: PropTypes.instanceOf(moment.fn.constructor),
	onChange: PropTypes.func,
	onSave: PropTypes.func,
	prevMonthIcon: PropTypes.string,
	nextMonthIcon: PropTypes.string
};

export default clickOutSide(InputCalendar);
