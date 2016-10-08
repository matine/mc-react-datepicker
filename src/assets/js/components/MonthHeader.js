/*
    Month Header
    <MonthHeader />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';

var MonthHeader = React.createClass({

	getInitialState: function() {
		return {
			view: DateUtilities.clone(this.props.view),
			enabled: true
		};
	},

	moveForward: function() {
		var view = DateUtilities.clone(this.state.view);
		view = DateUtilities.getNextMonth(view),
		this.move(view, true);
	},

	moveBackward: function() {
		var view = DateUtilities.clone(this.state.view);
		view = DateUtilities.getPrevMonth(view),
		this.move(view, false);
	},

	move: function(view, isForward) {
		if (!this.state.enabled)
			return;

		this.setState({
			view: view,
			enabled: false
		});

		this.props.onMove(view, isForward);
	},

	enable: function() {
		this.setState({ enabled: true });
	},

	render : function() {
		var enabled = this.state.enabled;

		return (
			<div className="month-header">
				<i className={enabled ? "" : " disabled"} onClick={this.moveBackward}></i>
				<i className={enabled ? "" : " disabled"} onClick={this.moveForward}></i>
				<span className="month-title">{DateUtilities.toMonthAndYearString(this.state.view)}</span>
				<span className="month-title">{DateUtilities.toMonthAndYearString(DateUtilities.getNextMonth(this.state.view))}</span>
			</div>
		)
	},

	propTypes : {
		view : React.PropTypes.object.isRequired,
		onMove : React.PropTypes.func.isRequired
	}
});

export default MonthHeader;

