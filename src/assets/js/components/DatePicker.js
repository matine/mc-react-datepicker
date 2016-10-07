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
				this.hideCalendar();
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

	// On select of a day, set start or end date and input highlighting
	onSelect: function(day) {
		var self = this;

		if (!DateUtilities.isSameDay(day, new Date()) && day < new Date())
			return;

		if (this.state.startDateInputActive) {
			this.setInputDate("start", day);
			this.setInputHighlighting("end");
			if (day > this.selectedEnd) {
				this.setInputDate("end");
			}
		} else if (this.state.endDateInputActive) {
			this.setInputDate("end", day);
			this.setInputHighlighting("none");
			if (day < this.selectedStart) {
				this.setInputDate("start");
			}
		} else {
			if (day >= this.state.selectedStart) {
				this.setInputDate("end", day);
				this.setInputHighlighting("end");
				setTimeout( function() {
					self.setInputHighlighting("none");
				}, 200)
			} else {
				this.setInputDate("start", day);
				this.setInputHighlighting("start");
				setTimeout( function() {
					self.setInputHighlighting("none");
				}, 200)
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
		// Create object to pass through Calendar component
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
		// Get input theme from config
		var configInputs = this.state.config.theme.inputs

		return (
			<div className="mc-date-picker">
				<Inputs datePickerStates={statesForInput} showCalendar={this.showCalendar}></Inputs>
				<div className={this.state.visible ? "calendars visible" : "calendars"}>
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
