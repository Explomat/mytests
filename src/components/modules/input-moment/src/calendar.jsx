import cx from 'classnames';
import React, { Component } from 'react';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, ...props }) => {
	const prevMonth = (w === 0 && i > 7);
	const nextMonth = (w >= 4 && i <= 14);
	const cn = cx({
		'prev-month': prevMonth,
		'next-month': nextMonth,
		'current-day': !prevMonth && !nextMonth && (i === d)
	});

	return <td className={cn} {...props}>{i}</td>;
};

class Calendar extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handlePrevMonth = this.handlePrevMonth.bind(this);
		this.handleNextMonth = this.handleNextMonth.bind(this);
	}
	
	handleSelectDate(i, w) {
		const prevMonth = (w === 0 && i > 7);
		const nextMonth = (w >= 4 && i <= 14);
		const m = this.props.moment;

		m.date(i);
		if (prevMonth) m.subtract(1, 'month');
		if (nextMonth) m.add(1, 'month');

		this.props.onChange(m);
	}

	handlePrevMonth(e) {
		e.preventDefault();
		this.props.onChange(this.props.moment.subtract(1, 'month'));
	}

	handleNextMonth(e) {
		e.preventDefault();
		this.props.onChange(this.props.moment.add(1, 'month'));
	}
	
	render() {
		const m = this.props.moment;
		const d = m.date();
		const d1 = m.clone().subtract(1, 'month').endOf('month').date();
		const d2 = m.clone().date(1).day();
		const d3 = m.clone().endOf('month').date();

		const days = [].concat(
			range(d1 - d2 + 1, d1 + 1),
			range(1, d3 + 1),
			range(1, 42 - d3 - d2 + 1)
		);

		const weeks = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

		return (
			<div className={cx('m-calendar', this.props.className)}>
				<div className='toolbar'>
					<button type='button' className='prev-month' onClick={this.handlePrevMonth}>
						<i className={this.props.prevMonthIcon}/>
					</button>
					<span className='current-date'>{m.format('MMMM YYYY')}</span>
					<button type='button' className='next-month' onClick={this.handleNextMonth}>
						<i className={this.props.nextMonthIcon}/>
					</button>
				</div>

				<table>
					<thead>
						<tr>
							{weeks.map((w, i) => {
								return <td key={i}>{w}</td>;
							})}
						</tr>
					</thead>

					<tbody>
						{chunk(days, 7).map((row, w) => {
							return (
								<tr key={w}>
									{row.map((i) => {
										return (
											<Day
												key={i}
												i={i}
												d={d}
												w={w}
												onClick={this.handleSelectDate.bind(this, i, w)}
											/>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Calendar;
