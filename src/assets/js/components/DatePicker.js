/*
    Date Picker
    <DatePicker />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from '../Helpers';
import DateUtilities from '../DateUtilities';
import Inputs from './Inputs';
import Calendar from './Calendar';

var DatePicker = React.createClass({

	getInitialState: function() {
		var config = this.configObj();
		var viewDate = config.preselectedStartDate || config.preselectedEndDate || new Date();
		var view = DateUtilities.clone(viewDate);

		return {
			view: view,
			selectedStart: config.preselectedStartDate || config.selectedStartDefaultString,
			selectedEnd: config.preselectedEndDate || config.selectedEndDefaultString,
			startDateInputActive: false,
			endDateInputActive: false,
			visible: false,
			config: config
		};
	},

	componentDidMount: function() {
		document.addEventListener("click", function(e) {
			if (this.state.visible && e.target.className !== "date-picker-trigger" && !Helpers.parentsHaveClassName(e.target, "mc-date-picker"))
				this.hideCalendar();
		}.bind(this));
	},

	configObj: function() {
		// Set all the nested objects inside the config to be empty objects if user has not defined them
		var userConfig = this.props.userConfig || {};
		userConfig.classNames = userConfig.classNames || {};
		userConfig.theme = userConfig.theme || {};
		userConfig.theme.inputs = userConfig.theme.inputs || {};
		userConfig.theme.days = userConfig.theme.days || {};

		// Set up colors for default theme
		var textGray = "#565a5c",
			teal = "#66e2da",
			lightTeal = "#99ede6",
			darkTeal = "#00a699";

		// Return config object with user config settings/themes if they exist, otherwise use default
		return {
			selectedStartDefaultString : userConfig.selectedStartDefaultString || "Check In",
			selectedEndDefaultString : userConfig.selectedEndDefaultString || "Check Out",
			preselectedStartDate : userConfig.preselectedStartDate || null,
			preselectedEndDate : userConfig.preselectedEndDate || null,
			disabledDays : userConfig.disabledDays || [],
			classNames : {
				datepicker: userConfig.classNames.datepicker || null,
				dateInputsWrapper: userConfig.classNames.dateInputsWrapper || null,
				dateInput: userConfig.classNames.dateInput || null,
				dateInputStart: userConfig.classNames.dateInputStart || null,
				dateInputEnd: userConfig.classNames.dateInputEnd || null,
				calendarWrapper: userConfig.classNames.calendarWrapper || null,
				calendar: userConfig.classNames.calendar || null
			},
			theme : {
				inputs : {
					activeBackgroundColor: userConfig.theme.inputs.activeBackgroundColor || lightTeal,
					activeColor: userConfig.theme.inputs.activeColor || textGray
				},
				days : {
					selectedBackgroundColor: userConfig.theme.days.selectedBackgroundColor || darkTeal,
					inbetweenBackgroundColor: userConfig.theme.days.inbetweenBackgroundColor || lightTeal,
				}
			}
		}
	},

	selectStartDate: function(day) {
		var self = this;
		var endDateIsSelected = DateUtilities.isDateObj(this.state.selectedEnd);
		this.setInputDate("start", day);
		this.setInputHighlighting("start");
		setTimeout( function() {
			endDateIsSelected ? self.setInputHighlighting("none") : self.setInputHighlighting("end");
		}, 200)
	},

	selectEndDate: function(day) {
		var self = this;
		var startDateIsSelected = DateUtilities.isDateObj(this.state.selectedStart);
		this.setInputDate("end", day);
		this.setInputHighlighting("end");
		setTimeout( function() {
			startDateIsSelected ? self.setInputHighlighting("none") : self.setInputHighlighting("start");
		}, 200)
	},

	// On select of a day, set start or end date and input highlighting
	onSelect: function(day) {
		// if the start date input is highlighted
		if (this.state.startDateInputActive) {
			// if user is trying to select startdate after enddate, select enddate instead
			if (day > this.state.selectedEnd) {
				this.selectEndDate(day);
			} else {
				this.selectStartDate(day);
			}
		// else if the end date input is highlighted
		} else if (this.state.endDateInputActive) {
			// If user is trying to select enddate before startdate, select startdate instead
			if (day < this.state.selectedStart) {
				this.selectStartDate(day);
			} else {
				this.selectEndDate(day);
			}
		// else if no inputs are highlighted
		} else {
			if (day >= this.state.selectedStart) {
				this.selectEndDate(day);
			} else {
				this.selectStartDate(day);
			}
		}
	},

	setInputDate: function(inputType, day) {
		// If a day has been passed in, set the input to that date obj
		if (day) {
			if (inputType === "start")
				this.setState({ selectedStart: day });
			if (inputType === "end")
				this.setState({ selectedEnd: day });
		// Otherwise set to default strings
		} else {
			if (inputType === "start")
				this.setState({ selectedStart: "Check In" });
			if (inputType === "end")
				this.setState({ selectedEnd: "Check Out" });
		}
	},

	setInputHighlighting: function(startOrEnd) {
		if (startOrEnd === "start") {
			this.setDateInputActiveState("start", true);
			this.setDateInputActiveState("end", false);
		} else if (startOrEnd === "end") {
			this.setDateInputActiveState("start", false);
			this.setDateInputActiveState("end", true);
		} else {
			this.setDateInputActiveState("both", false);
		}
	},

	setDateInputActiveState: function(startOrEnd, bool) {
		if (startOrEnd === "start") {
			this.setState({ startDateInputActive: bool });
		} else if (startOrEnd === "end") {
			this.setState({ endDateInputActive: bool });
		} else {
			this.setState({ startDateInputActive: bool });
			this.setState({ endDateInputActive: bool });
		}
	},

	showCalendar: function(inputType) {
		this.setState({ visible: true });
		this.setInputHighlighting(inputType);
	},

	hideCalendar: function() {
		this.setState({ visible: false });
		this.setState({ startDateInputActive: false });
		this.setState({ endDateInputActive: false });
	},

	render : function() {
		// Create object to pass through components
		var statesForCalendar = {
			config: this.state.config,
			view: this.state.view,
			selectedStart: this.state.selectedStart,
			selectedEnd: this.state.selectedEnd
		}
		var statesForInput = {
			config: this.state.config,
			selectedStart: this.state.selectedStart,
			selectedEnd: this.state.selectedEnd,
			startDateInputActive: this.state.startDateInputActive,
			endDateInputActive: this.state.endDateInputActive
		}
		// If exists, add user specified class to the datepicker
		var datepickerClassName = "mc-date-picker";
		datepickerClassName = Helpers.AddClassNameIfExists(datepickerClassName, this.state.config.classNames.datepicker);

		// Get input theme from config
		var configInputs = this.state.config.theme.inputs

		// Create class for calendar wrapper with visible or not
		var calendarWrapperClassName = this.state.visible ? "calendar-wrapper visible" : "calendar-wrapper";
		// If exists, add user specified class to the calendar wrapper
		calendarWrapperClassName = Helpers.AddClassNameIfExists(calendarWrapperClassName, this.state.config.classNames.calendarWrapper);

		return (
			<div className={datepickerClassName}>
				<Inputs datePickerStates={statesForInput} showCalendar={this.showCalendar}></Inputs>
				<div className={calendarWrapperClassName}>
					<Calendar datePickerStates={statesForCalendar} onSelect={this.onSelect}></Calendar>
				</div>
			</div>
		)
	},

	propTypes : {
		userConfig : React.PropTypes.object
	}
});

export default DatePicker;
