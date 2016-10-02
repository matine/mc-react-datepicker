/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {
		return (
			<div>
				<h1>Datepicker Component</h1>
				<DatePicker></DatePicker>
			</div>
		)
	}
});

export default App;
