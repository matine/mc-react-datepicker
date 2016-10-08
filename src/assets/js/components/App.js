/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {
		var d = new Date();

		var textGray = "#565a5c",
			coral = "#ff9999",
			lightCoral = "#ffcccc",
			darkCoral = "#ff4d4d";

		var config = {
			selectedStartDefaultString : "Start date",
			selectedEndDefaultString : "End date",
			disabledDays : [
				{
					firstDay : d.setDate(17),
					lastDay : d.setDate(19)
				},
				{
					firstDay : d.setMonth(11),
					lastDay : d.setMonth(11)
				}
			],
			theme : {
				inputs : {
					activeBackgroundColor: lightCoral,
					activeColor: textGray
				},
				days : {
					selectedBackgroundColor: darkCoral,
					inbetweenBackgroundColor: lightCoral,
				}
			}
		}

		return (
			<div>
				<DatePicker userConfig={config}></DatePicker>
			</div>
		)
	}
});

export default App;
