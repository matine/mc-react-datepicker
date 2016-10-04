/*
    Week
    <Week />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';

var Week = React.createClass({

	buildDays: function(start) {
		var days = [DateUtilities.clone(start)],
			clone = DateUtilities.clone(start);

		for (var i = 1; i <= 6; i++) {
			clone = DateUtilities.clone(clone);
			clone.setDate(clone.getDate()+1);
			days.push(clone);
		}
		return days;
	},

	isOtherMonth: function(day) {
		return this.props.month !== day.month();
	},

	getDayClassName: function(day) {
		var selectedStart = this.props.calendarObj.selectedStart;
		var selectedEnd = this.props.calendarObj.selectedEnd;

		var className = "day";
		// If 'day' is today, give classname 'today'
		if (DateUtilities.isSameDay(day, new Date()))
			className += " today";
		// If 'day' is a different month, give classname 'other-month'
		if (this.props.month !== day.getMonth())
			className += " other-month";
		// If 'day' is selectedStart, give classname 'selected-start'
		if (DateUtilities.isDateObj(selectedStart) && DateUtilities.isSameDay(day, selectedStart)) {
			className += " selected-start";
		}
		// If 'day' is selectedEnd, give classname 'selected-end'
		if (DateUtilities.isDateObj(selectedEnd) && DateUtilities.isSameDay(day, selectedEnd)) {
			className += " selected-end";
		}
		// If 'day' is between selectedStart and selectedEnd, give classname 'inbetween'
		if (day < selectedEnd && day > selectedStart) {
			className += " inbetween";
		}
		if (this.isDisabled(day))
			className += " disabled";
		return className;
	},

	onSelect: function(day) {
		if (!this.isDisabled(day) && this.props.month === day.getMonth())
			this.props.onSelect(day);
	},

	isDisabled: function(day) {
		var minDate = this.props.minDate;
		var maxDate = this.props.maxDate;

		return (minDate && DateUtilities.isBefore(day, minDate)) || (maxDate && DateUtilities.isAfter(day, maxDate));
	},

	render: function() {
		var days = this.buildDays(this.props.start);
		var self = this;

		return (
			<div className="week">
				{days.map(function(day, i){
					return <div key={i} onClick={self.onSelect.bind(null, day)} className={self.getDayClassName(day)}>{DateUtilities.toDayOfMonthString(day)}</div>
				}.bind(self))}
			</div>
		)
	},

	propTypes : {
		start : React.PropTypes.object.isRequired,
		month: React.PropTypes.number.isRequired,
		calendarObj : React.PropTypes.object.isRequired,
		onSelect : React.PropTypes.func.isRequired,
		minDate : React.PropTypes.object,
		maxDate : React.PropTypes.object
	}
});

export default Week;
