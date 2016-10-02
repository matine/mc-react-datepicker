/*
    Weeks
    <Weeks />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';
import classNames from 'classNames';
import Week from './Week';


var Weeks = React.createClass({

	getInitialState: function() {
		return {
			view: DateUtilities.clone(this.props.view),
			other: DateUtilities.clone(this.props.view),
			sliding: null
		};
	},

	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.current).addEventListener("transitionend", this.onTransitionEnd);
	},

	onTransitionEnd: function() {
		console.log('Weeks: onTransitionEnd');
		this.setState({
			sliding: null,
			view: DateUtilities.clone(this.state.other)
		});

		this.props.onTransitionEnd();
	},

	getWeekStartDates: function(view) {
		view.setDate(1);
		view = DateUtilities.moveToDayOfWeek(DateUtilities.clone(view), 0);

		var current = DateUtilities.clone(view);
		current.setDate(current.getDate()+7);

		var starts = [view],
			month = current.getMonth();

		while (current.getMonth() === month) {
			starts.push(DateUtilities.clone(current));
			current.setDate(current.getDate()+7);
		}

		return starts;
	},

	moveTo: function(view, isForward) {
		this.setState({
			sliding: isForward ? "left" : "right",
			other: DateUtilities.clone(view)
		});
	},

	render: function() {
		var currentSlidingClass, otherSlidingClass;
		if (this.state.sliding) {
			currentSlidingClass = "current sliding " + this.state.sliding;
			otherSlidingClass = "other sliding " + this.state.sliding;
		} else {
			currentSlidingClass = "current";
			otherSlidingClass = "other";
		}

		return (
			<div className="weeks">
				<div ref="current" className={currentSlidingClass}>{this.renderWeeks(this.state.view)}</div>
				<div ref="other" className={otherSlidingClass}>{this.renderWeeks(this.state.other)}</div>
			</div>
		)
	},

	renderWeeks: function(view) {
		var starts = this.getWeekStartDates(view);
		var month = starts[1].getMonth();
		var self = this;

		return starts.map(function(s, i) {
			return (
				<Week key={i} start={s} month={month} selected={self.props.selected} onSelect={self.props.onSelect} minDate={self.props.minDate} maxDate={self.props.maxDate}></Week>
			)
		}.bind(self));
	},

	propTypes : {
		view : React.PropTypes.object.isRequired,
		selected : React.PropTypes.object.isRequired,
		onTransitionEnd : React.PropTypes.func.isRequired,
		onSelect : React.PropTypes.func.isRequired,
		minDate : React.PropTypes.object,
		maxDate : React.PropTypes.object
	}
});

export default Weeks;
