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
		var config = this.configObj();

		return {
			view: view,
			selectedStart: "Check In",
			selectedEnd: "Check Out",
			startDateInputActive: false,
			endDateInputActive: false,
			visible: false,
			config: config
		};
	},

	componentDidMount: function() {
		document.addEventListener("click", function(e) {
			if (this.state.visible && e.target.className !== "date-picker-trigger" && !Helpers.parentsHaveClassName(e.target, "mc-date-picker"))
				this.hide();
		}.bind(this));
	},

	configObj: function() {
		// Shorten names for user config to use in the object
		var userConfig = this.props.userConfig;
		var userTheme = this.props.userConfig.theme;

		// Set up colors for default theme
		var textGray = "#565a5c",
			teal = "#66e2da",
			lightTeal = "#99ede6",
			darkTeal = "#00a699";

		// Return config object with user config settings/themes if they exist, otherwise use default
		return {
			theme : {
				inputs : {
					activeBackgroundColor: userTheme.inputs.activeBackgroundColor ? userTheme.inputs.activeBackgroundColor : lightTeal,
					activeColor: userTheme.inputs.activeColor ? userTheme.inputs.activeColor : textGray
				},
				days : {
					dayBackgroundColor: "white",
					dayColor: userTheme.days.dayColor ? userTheme.days.dayColor : textGray,
					hoverBackgroundColor: teal,
					hoverColor: textGray,
					selectedBackgroundColor: userTheme.days.selectedBackgroundColor ? userTheme.days.selectedBackgroundColor : darkTeal,
					selectedColor: "white",
					inbetweenBackgroundColor: userTheme.days.inbetweenBackgroundColor ? userTheme.days.inbetweenBackgroundColor : lightTeal,
					inbetweenColor: userTheme.days.inbetweenColor ? userTheme.days.inbetweenColor : textGray
				}
			}
		}
	},

	onSelect: function(day) {
		var self = this;

		if (!DateUtilities.isSameDay(day, new Date()) && day < new Date())
			return;

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
		// Create object to pass through Calendar component
		var calendarObj = {
			view: this.state.view,
			selectedStart: this.state.selectedStart,
			selectedEnd: this.state.selectedEnd
		}
		// Get input theme from config
		var configInputs = this.state.config.theme.inputs

		// Create style objects for input fields using config
		var inputActiveStyle = {
			color: configInputs.activeColor,
			backgroundColor: configInputs.activeBackgroundColor
		};
		var inputInactiveStyle = {
			backgroundColor: "white"
		};

		// Create strings to use as value for inputs, by using default string or turning date obj into string if exists
		var selectedStartString = calendarObj.selectedStart;
		var selectedEndString = calendarObj.selectedEnd;
		if (DateUtilities.isDateObj(calendarObj.selectedStart)) selectedStartString = DateUtilities.toString(this.state.selectedStart)
		if (DateUtilities.isDateObj(calendarObj.selectedEnd)) selectedEndString = DateUtilities.toString(this.state.selectedEnd)

		return (
			<div className="mc-date-picker">
				<div className="datepicker-inputs">
					<input type="text" className="date-picker-trigger" style={this.state.startDateInputActive ? inputActiveStyle : inputInactiveStyle} readOnly="true" value={selectedStartString} onClick={this.show.bind(null, 'start')} />
					<input ref="endInput" type="text" className={"date-picker-trigger"} style={this.state.endDateInputActive ? inputActiveStyle : inputInactiveStyle} readOnly="true" value={selectedEndString} onClick={this.show.bind(null, 'end')} />
				</div>
				<div className={this.state.visible ? "calendars visible" : "calendars"}>
					<Calendar calendarObj={calendarObj} config={this.state.config} onSelect={this.onSelect}></Calendar>
				</div>
			</div>
		)
	},

	propTypes : {
		userConfig : React.PropTypes.object
	}
});

export default DatePicker;
