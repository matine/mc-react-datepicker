/*
    Date Picker
    <DatePicker />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from '../Helpers';
import DateUtilities from '../DateUtilities';
import Calendar from './Calendar';

var DatePicker = React.createClass({

	getInitialState: function() {
		var def = this.props.selected || new Date();
		var view = DateUtilities.clone(def);

		return {
			view: view,
			selectedStart: "Check In",
			selectedEnd: "Check Out",
			startDateInputActive: false,
			endDateInputActive: false,
			minDate: null,
			maxDate: null,
			visible: false
		};
	},

	componentDidMount: function() {
		document.addEventListener("click", function(e) {
			if (this.state.visible && e.target.className !== "date-picker-trigger" && !Helpers.parentsHaveClassName(e.target, "mc-date-picker"))
				this.hide();
		}.bind(this));
	},

	setMinDate: function(date) {
		this.setState({ minDate: date });
	},

	setMaxDate: function(date) {
		this.setState({ maxDate: date });
	},

	onSelect: function(day) {
		var self = this;

		if (this.state.startDateInputActive) {
			this.setState({ selectedStart: day });
			this.setInputHighlighting("end");
			if (day > this.state.selectedEnd) {
				this.setInputDateToDefault("end");
			}
		} else if (this.state.endDateInputActive) {
			this.setState({ selectedEnd: day });
			this.setInputHighlighting("none");
			if (day < this.state.selectedStart) {
				this.setInputDateToDefault("start");
			}
		} else {
			if (day >= this.state.selectedStart) {
				this.setState({ selectedEnd: day });
				this.setInputHighlighting("end");
				setTimeout( function() {
					self.setInputHighlighting("none");
				}, 200)
			} else {
				this.setState({ selectedStart: day });
				this.setInputHighlighting("start");
				setTimeout( function() {
					self.setInputHighlighting("none");
				}, 200)
			}
		}
	},

	setInputDateToDefault: function(inputType) {
		if (inputType === "start") {
			this.setState({ selectedStart: "Check In" });
		} else {
			this.setState({ selectedEnd: "Check Out" });
		}
	},

	setInputHighlighting: function(inputType) {
		if (inputType === "start") {
			this.setState({ startDateInputActive: true });
			this.setState({ endDateInputActive: false });
		} else if (inputType === "end") {
			this.setState({ startDateInputActive: false });
			this.setState({ endDateInputActive: true });
		} else {
			this.setState({ startDateInputActive: false });
			this.setState({ endDateInputActive: false });
		}
	},

	show: function(inputType) {
		this.setState({ visible: true });
		this.setInputHighlighting(inputType);
	},

	hide: function() {
		this.setState({ visible: false });
		this.setState({ startDateInputActive: false });
		this.setState({ endDateInputActive: false });
	},

	render : function() {
		var calendarObj = {
			view: this.state.view,
			selectedStart: this.state.selectedStart,
			selectedEnd: this.state.selectedEnd
		}

		var selectedStartString = calendarObj.selectedStart;
		var selectedEndString = calendarObj.selectedEnd;
		if (DateUtilities.isDateObj(calendarObj.selectedStart)) selectedStartString = DateUtilities.toString(this.state.selectedStart)
		if (DateUtilities.isDateObj(calendarObj.selectedEnd)) selectedEndString = DateUtilities.toString(this.state.selectedEnd)

		return (
			<div className="mc-date-picker">
				<div className="datepicker-inputs">
					<input type="text" className={this.state.startDateInputActive ? "date-picker-trigger active" : "date-picker-trigger"} readOnly="true" value={selectedStartString} onClick={this.show.bind(null, 'start')} />
					<input ref="endInput" type="text" className={this.state.endDateInputActive ? "date-picker-trigger active" : "date-picker-trigger"} readOnly="true" value={selectedEndString} onClick={this.show.bind(null, 'end')} />
				</div>
				<div className={this.state.visible ? "calendars visible" : "calendars"}>
					<Calendar calendarObj={calendarObj} onSelect={this.onSelect} minDate={this.state.minDate} maxDate={this.state.maxDate}></Calendar>
				</div>
			</div>
		)
	},

	propTypes : {}
});

export default DatePicker;
