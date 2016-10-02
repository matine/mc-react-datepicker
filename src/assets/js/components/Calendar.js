/*
    Calendar
    <Calendar />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import DateUtilities from '../DateUtilities';
import classNames from 'classNames';
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
		var classes = classNames({
			'calendar': true,
			'activeClass': this.props.visible ? " visible" : ""
		});
		return (
			<div className={classes}>
				<MonthHeader ref="monthHeader" view={this.props.view} onMove={this.onMove}></MonthHeader>
				<WeekHeader ref="weekHeader"></WeekHeader>
				<Weeks ref="weeks" view={this.props.view} selected={this.props.selected} onTransitionEnd={this.onTransitionEnd} onSelect={this.props.onSelect} minDate={this.props.minDate} maxDate={this.props.maxDate}></Weeks>
			</div>
		)
	},

	propTypes : {
		visible : React.PropTypes.bool.isRequired,
		view : React.PropTypes.object.isRequired,
		selected : React.PropTypes.object.isRequired,
		onSelect : React.PropTypes.func.isRequired,
		minDate : React.PropTypes.object,
		maxDate : React.PropTypes.object
	}
});

export default Calendar;
