/*
    Month Header
    <MonthHeader />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';
import classNames from 'classNames';

var MonthHeader = React.createClass({

	getInitialState: function() {
		return {
			view: DateUtilities.clone(this.props.view),
			enabled: true
		};
	},

	moveBackward: function() {
		var view = DateUtilities.clone(this.state.view);
		view.setMonth(view.getMonth()-1);
		this.move(view, false);
	},

	moveForward: function() {
		var view = DateUtilities.clone(this.state.view);
		view.setMonth(view.getMonth()+1);
		this.move(view, true);
	},

	move: function(view, isForward) {
		// if (!this.state.enabled)
		// 	return;

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
				<i className={enabled ? "" : " disabled"} onClick={this.moveBackward}>{String.fromCharCode(9664)}</i>
				<span>{DateUtilities.toMonthAndYearString(this.state.view)}</span>
				<i className={enabled ? "" : " disabled"} onClick={this.moveForward}>{String.fromCharCode(9654)}</i>
			</div>
		)
	},

	propTypes : {
		view : React.PropTypes.object.isRequired,
		onMove : React.PropTypes.func.isRequired
	}
});

export default MonthHeader;

