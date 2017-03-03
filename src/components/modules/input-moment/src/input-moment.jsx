import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Calendar from './calendar';
import Time from './time';

import './style/input-moment.scss';

class InputMoment extends Component {
	
	constructor(props){
		super(props);
		
		this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
		this.handleClickTab = this.handleClickTab.bind(this);
		this.handleSave = this.handleSave.bind(this);
		
		this.state = {
			tab: 0,
			moment: this.props.moment
		};
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ moment: nextProps.moment });
	}

	handleChangeDateTime(moment) {
		this.setState({ moment });
	}

	handleClickTab(tab, e) {
		e.preventDefault();
		this.setState({ tab });
	}

	handleSave(e) {
		e.preventDefault();
		const m = this.state.moment;
		if (this.props.onSave) this.props.onSave(m);
	}
	
	render() {
		const { tab, moment } = this.state;
		const { displayDate, displayTime } = this.props;
		
		return (
			<div className='m-input-moment'>
				<div className='options'>
					{displayDate &&
						<button
							type='button'
							className={cx('icon-calendar im-btn', { 'is-active': tab === 0 })}
							onClick={this.handleClickTab.bind(null, 0)}
						>
							Дата
						</button>
					}
					{displayTime &&
						<button
							type='button'
							className={cx('icon-clock-o im-btn', { 'is-active': tab === 1 })}
							onClick={this.handleClickTab.bind(null, 1)}
						>
							Время
						</button>
					}
				</div>

				<div className='tabs'>
					{displayDate &&
						<Calendar
							className={cx('tab', { 'is-active': tab === 0 })}
							moment={moment}
							onChange={this.handleChangeDateTime}
							prevMonthIcon={this.props.prevMonthIcon}
							nextMonthIcon={this.props.nextMonthIcon}
						/>
					}
					{displayTime &&
						<Time
							className={cx('tab', { 'is-active': tab === 1 })}
							moment={moment}
							onChange={this.handleChangeDateTime}
						/>
					}
				</div>
				<button
					type='button'
					className='im-btn btn-save ion-checkmark'
					onClick={this.handleSave}
				>
					Сохранить
				</button>
			</div>
		);
	}
}

InputMoment.defaultProps = {
	displayDate: true,
	displayTime: true,
	prevMonthIcon: 'icon-left-open-big',
	nextMonthIcon: 'icon-right-open-big'
};

InputMoment.propTypes = {
	moment: PropTypes.object,
	onSave: PropTypes.func,
	displayDate: PropTypes.bool,
	displayTime: PropTypes.bool,
	prevMonthIcon: PropTypes.string,
	nextMonthIcon: PropTypes.string
};

export default InputMoment;
