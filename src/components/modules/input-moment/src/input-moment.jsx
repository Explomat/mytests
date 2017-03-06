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
		this._renderTabs = this._renderTabs.bind(this);
		
		const { displayDate, displayTime } = props;
		this.displayDateAndTime = displayDate && displayTime;
		this.state = {
			tab: this.displayDateAndTime ? 0 : displayDate ? 0 : 1,
			moment: props.moment
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
	
	_renderTabs(){
		const { tab } = this.state;
		
		if (this.displayDateAndTime) {
			return (
				<div className='options'>
					<button
						type='button'
						className={cx('icon-calendar im-btn', { 'is-active': tab === 0 })}
						onClick={this.handleClickTab.bind(null, 0)}
					>
						Дата
					</button>
					<button
						type='button'
						className={cx('icon-clock-o im-btn', { 'is-active': tab === 1 })}
						onClick={this.handleClickTab.bind(null, 1)}
					>
						Время
					</button>
				</div>
			);
		}
		return null;
	}
	
	render() {
		const { tab, moment } = this.state;
		const { displayDate, displayTime } = this.props;
		
		return (
			<div className='m-input-moment'>
				{this._renderTabs()}
				
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
