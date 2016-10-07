/*
    Inputs
    <Inputs />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from '../Helpers';
import DateUtilities from '../DateUtilities';

var DatePicker = React.createClass({

	render : function() {
		var configInputs = this.props.datePickerStates.config.theme.inputs;
		var selectedStart = this.props.datePickerStates.selectedStart;
		var selectedEnd = this.props.datePickerStates.selectedEnd;

		// Create style objects for input fields using config
		var inputActiveStyle = {
			color: configInputs.activeColor,
			backgroundColor: configInputs.activeBackgroundColor
		};
		var inputInactiveStyle = {
			backgroundColor: "white"
		};

		// Create strings to use as value for inputs, by using default string or turning date obj into string if exists
		var selectedStartString = selectedStart;
		var selectedEndString = selectedEnd;
		if (DateUtilities.isDateObj(selectedStart)) selectedStartString = DateUtilities.toString(selectedStart)
		if (DateUtilities.isDateObj(selectedEnd)) selectedEndString = DateUtilities.toString(selectedEnd)

		return (
			<div className="datepicker-inputs">
				<input type="text" className="date-picker-trigger" style={this.props.datePickerStates.startDateInputActive ? inputActiveStyle : inputInactiveStyle} readOnly="true" value={selectedStartString} onClick={this.props.showCalendar.bind(null, 'start')} />
				<input ref="endInput" type="text" className={"date-picker-trigger"} style={this.props.datePickerStates.endDateInputActive ? inputActiveStyle : inputInactiveStyle} readOnly="true" value={selectedEndString} onClick={this.props.showCalendar.bind(null, 'end')} />
			</div>
		)
	},

	propTypes : {
		datePickerStates : React.PropTypes.object.isRequired,
		showCalendar : React.PropTypes.func.isRequired
	}
});

export default DatePicker;
