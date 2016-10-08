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

	getDayStatusArray: function(day) {
		var dayStatusArray = [];

		var selectedStart = this.props.datePickerStates.selectedStart;
		var selectedEnd = this.props.datePickerStates.selectedEnd;

		// Get disabled date ranges from array passed in by user in config
		this.props.datePickerStates.config.disabledDays.map(function(dateRange) {
			var firstDay = new Date(dateRange.firstDay);
			var lastDay = new Date(dateRange.lastDay);
			if (DateUtilities.isSameDay(day, firstDay) || DateUtilities.isSameDay(day, lastDay) || (day > firstDay && day < lastDay)) {
				dayStatusArray.push("disabled");
			}
		})
		// If 'day' is today
		if (DateUtilities.isSameDay(day, new Date()))
			dayStatusArray.push("today");
		// If 'day' is in the past
		else if (day < new Date())
			dayStatusArray.push("past");
		// If 'day' is between selectedStart and selectedEnd and is same month
		else if (day < selectedEnd && day > selectedStart && this.props.month === day.getMonth())
			dayStatusArray.push("inbetween");
		// If 'day' is last of the month
		if (DateUtilities.isLastDayOfMonth(day))
			dayStatusArray.push("last-day");
		// If 'day' is selectedStart
		if (DateUtilities.isDateObj(selectedStart) && DateUtilities.isSameDay(day, selectedStart))
			dayStatusArray.push("selected-start");
		// If 'day' is selectedEnd
		if (DateUtilities.isDateObj(selectedEnd) && DateUtilities.isSameDay(day, selectedEnd))
			dayStatusArray.push("selected-end");
		// If 'day' is a different month
		if (this.props.month !== day.getMonth())
			dayStatusArray.push("other-month");

		return dayStatusArray;
	},

	checkArrayForStatus: function(dayStatusArray, specifiedStatus) {
		var hasSpecifiedStatus = false;
		dayStatusArray.map(function(dayStatus) {
			if (dayStatus === specifiedStatus)
				hasSpecifiedStatus = true;
		})
		return hasSpecifiedStatus;
	},

	getDayClassAndStyle: function(day) {
		var self = this;
		var dayStatusArray = this.getDayStatusArray(day);
		var configThemeDays = this.props.datePickerStates.config.theme.days;
		var styles = { backgroundColor: null }
		var className = "day";

		// Loop through all items in the day status array
		dayStatusArray.map(function(dayStatus) {
			// Set classnames to all the items
			className += " " + dayStatus;

			// Check if also has other-month, disabled or past status
			var dayIsDisabled = self.checkArrayForStatus(dayStatusArray, "disabled");
			var dayIsInPast = self.checkArrayForStatus(dayStatusArray, "past");
			var dayIsOtherMonth = self.checkArrayForStatus(dayStatusArray, "other-month");

			// Set selected day styles
			if (!dayIsInPast && !dayIsOtherMonth) {
				if (dayStatus === "selected-start" || dayStatus === "selected-end") {
					styles.backgroundColor = configThemeDays.selectedBackgroundColor;
				}
				if (dayStatus === "inbetween") {
					if (!dayIsDisabled) styles.color = configThemeDays.inbetweenColor;
					styles.backgroundColor = configThemeDays.inbetweenBackgroundColor;
				}
			}
		})

		return {
			className: className,
			styles: styles
		}
	},

	onSelect: function(day) {
		var dayStatusArray = this.getDayStatusArray(day);

		// Check if also has other-month, disabled or past status
		var dayIsDisabled = this.checkArrayForStatus(dayStatusArray, "disabled");
		var dayIsInPast = this.checkArrayForStatus(dayStatusArray, "past");
		var dayIsOtherMonth = this.checkArrayForStatus(dayStatusArray, "other-month");

		// If not disabled, other-month, in the past, and is in the same month as the current view
		if (!dayIsDisabled && !dayIsOtherMonth && !dayIsInPast && this.props.month === day.getMonth())
			this.props.onSelect(day);
	},

	render: function() {
		var days = this.buildDays(this.props.start);
		var self = this;

		return (
			<div className="week">
				{days.map(function(day, i) {
					{var classAndStyle = self.getDayClassAndStyle(day)}
					return <div key={i} onClick={self.onSelect.bind(null, day)} className={classAndStyle.className} style={classAndStyle.styles}>{DateUtilities.toDayOfMonthString(day)}</div>
				}.bind(self))}
			</div>
		)
	},

	propTypes : {
		start : React.PropTypes.object.isRequired,
		month: React.PropTypes.number.isRequired,
		datePickerStates : React.PropTypes.object.isRequired,
		onSelect : React.PropTypes.func.isRequired
	}
});

export default Week;
