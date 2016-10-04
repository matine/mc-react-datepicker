/*
    Week Header
    <WeekHeader />
*/

import React from 'react';
import ReactDOM from 'react-dom';

var WeekHeader = React.createClass({

	render : function() {
		return (
			<div className="week-header">
				<span>Mo</span>
				<span>Tu</span>
				<span>We</span>
				<span>Th</span>
				<span>Fr</span>
				<span>Sa</span>
				<span>Su</span>
			</div>
		)
	},

	propTypes : {}
});

export default WeekHeader;
