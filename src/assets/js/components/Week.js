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


		var className = "day";
		if (DateUtilities.isSameDay(day, new Date()))
			className += " today";
		if (this.props.month !== day.getMonth())
			className += " other-month";
		if (this.props.calendarObj.selected && DateUtilities.isSameDay(day, this.props.calendarObj.selected))
			className += " selected";
		if (this.isDisabled(day))
			className += " disabled";
		if ( this.props.calendarObj.calendar === "start" && (day > this.props.calendarObj.selected && day < this.props.calendarObj.selectedOther)) {
			className += " inbetween";
		}
		if ( this.props.calendarObj.calendar === "end" && (day < this.props.calendarObj.selected && day > this.props.calendarObj.selectedOther)) {
			className += " inbetween";
		}
		return className;
	},

	onSelect: function(day) {
		if (!this.isDisabled(day))
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
		calendarObj : React.PropTypes.object.isRequired,
		onSelect : React.PropTypes.func.isRequired,
		minDate : React.PropTypes.object,
		maxDate : React.PropTypes.object
	}
});

export default Week;
