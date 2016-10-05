/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {

		var colorThemeObj = {
			// today: "red",
			inputActiveBackground: "blue",
			inputActiveColor: "white"
		}

		return (
			<div>
				I am a react app
				<DatePicker userColorTheme={colorThemeObj}></DatePicker>
			</div>
		)
	}
});

export default App;
