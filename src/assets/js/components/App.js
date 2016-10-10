/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {

		var config = {
			selectedStartDefaultString : "Start date",
			selectedEndDefaultString : "End date",
			disabledDays : [
				{
					firstDay : new Date("October 16, 2016"),
					lastDay : new Date("October 19, 2016")
				},
				{
					firstDay : new Date("December 4, 2016"),
					lastDay : new Date("December 4, 2016"),
				}
			],
			classNames : {
				datepicker: "my-datepicker my-datepicker-one",
				dateInputsWrapper: "date-inputs-wrapper",
				dateInput: "date-input",
				dateInputStart: "date-input-start",
				dateInputEnd: "date-input-end",
				calendarWrapper: "my-calendar-wrapper",
				calendar: "my-calendar"
			},
			theme : {
				inputs : {
					activeBackgroundColor: "#ffcccc",
					activeColor: "#565a5c"
				},
				days : {
					selectedBackgroundColor:"#ff4d4d",
					inbetweenBackgroundColor: "#ffcccc",
				}
			}
		}

		return (
			<DatePicker userConfig={config}></DatePicker>
		)
	}
});

export default App;
