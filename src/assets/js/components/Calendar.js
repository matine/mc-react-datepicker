/*
    Calendar
    <Calendar />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';
import MonthHeader from './MonthHeader';
import WeekHeader from './WeekHeader';
import Weeks from './Weeks';

var Calendar = React.createClass({

	onMove: function(view, isForward) {
		this.refs.weeks.moveTo(view, isForward);
	},

	onTransitionEnd: function() {
		this.refs.monthHeader.enable();
	},

	render : function() {
		return (
			<div className="calendar">
				<MonthHeader ref="monthHeader" view={this.props.datePickerStates.view} onMove={this.onMove}></MonthHeader>
				<WeekHeader ref="weekHeader"></WeekHeader><WeekHeader ref="weekHeader"></WeekHeader>
				<Weeks ref="weeks" datePickerStates={this.props.datePickerStates} onTransitionEnd={this.onTransitionEnd} onSelect={this.props.onSelect}></Weeks>
			</div>
		)
	},

	propTypes : {
		datePickerStates : React.PropTypes.object.isRequired,
		onSelect : React.PropTypes.func.isRequired
	}
});

export default Calendar;
