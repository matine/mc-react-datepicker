/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {

		var textGray = "#565a5c",
			coral = "#ff9999",
			lightCoral = "#ffcccc",
			darkCoral = "#ff4d4d";

		var config = {
			theme : {
				inputs : {
					activeBackgroundColor: lightCoral,
					activeColor: textGray
				},
				days : {
					dayBackgroundColor: "white",
					dayColor: textGray,
					hoverBackgroundColor: coral,
					hoverColor: textGray,
					selectedBackgroundColor: darkCoral,
					selectedColor: "white",
					inbetweenBackgroundColor: lightCoral,
					inbetweenColor: textGray
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
