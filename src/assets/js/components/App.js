/*
	App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';


var App = React.createClass({

	render : function() {

		var config = {
			disabledDays : [
			],
			classNames : {
			},
			theme : {
				inputs : {
				},
				days : {
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
