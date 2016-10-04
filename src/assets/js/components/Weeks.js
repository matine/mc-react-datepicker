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
			view: DateUtilities.clone(this.props.calendarObj.view),
			allViews: DateUtilities.getAllviews(this.props.calendarObj.view),
			sliding: null
		};
	},

	componentDidUpdate: function() {
		ReactDOM.findDOMNode(this.refs.current).addEventListener("transitionend", this.onTransitionEnd);
	},

	onTransitionEnd: function() {
		var view = this.state.view;
		var newCurrentView;
		if (this.state.sliding === "right") {
			newCurrentView = DateUtilities.clone(this.state.allViews.viewPrev2);
		} else {
			newCurrentView = DateUtilities.clone(this.state.allViews.viewCurrent2);
		}
		this.setState({
			sliding: null,
			view: newCurrentView,
			allViews: DateUtilities.getAllviews(newCurrentView)
		});
		this.props.onTransitionEnd();
	},

	getWeekStartDates: function(view) {
		view.setDate(1);
		view = DateUtilities.moveToDayOfWeek(DateUtilities.clone(view), 1);

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
			view: isForward ? DateUtilities.clone(this.state.allViews.viewNext1) : DateUtilities.clone(this.state.allViews.viewPrev1)
		});
	},

	render: function() {
		var currentSlidingClass, prevSlidingClass, nextSlidingClass;
		if (this.state.sliding) {
			currentSlidingClass = "current sliding " + this.state.sliding;
			prevSlidingClass = "prev sliding " + this.state.sliding;
			nextSlidingClass = "next sliding " + this.state.sliding;
		} else {
			currentSlidingClass = "current";
			prevSlidingClass = "prev";
			nextSlidingClass = "next";
		}

		return (
			<div className="weeks">
				<div ref="prev" className={prevSlidingClass}>
					<div className="weeks-one">{this.renderWeeks(this.state.allViews.viewPrev1)}</div>
					<div className="weeks-two">{this.renderWeeks(this.state.allViews.viewPrev2)}</div>
				</div>
				<div ref="current" className={currentSlidingClass}>
					<div className="weeks-one">{this.renderWeeks(this.state.allViews.viewCurrent1)}</div>
					<div className="weeks-two">{this.renderWeeks(this.state.allViews.viewCurrent2)}</div>
				</div>
				<div ref="next" className={nextSlidingClass}>
					<div className="weeks-one">{this.renderWeeks(this.state.allViews.viewNext1)}</div>
					<div className="weeks-two">{this.renderWeeks(this.state.allViews.viewNext2)}</div>
				</div>
			</div>
		)
	},

	renderWeeks: function(view) {
		var starts = this.getWeekStartDates(view);
		var month = starts[1].getMonth();
		var self = this;

		return starts.map(function(s, i) {
			return (
				<Week key={i} start={s} month={month} calendarObj={this.props.calendarObj} onSelect={self.props.onSelect} minDate={self.props.minDate} maxDate={self.props.maxDate}></Week>
			)
		}.bind(self));
	},

	propTypes : {
		calendarObj : React.PropTypes.object.isRequired,
		onTransitionEnd : React.PropTypes.func.isRequired,
		onSelect : React.PropTypes.func.isRequired,
		minDate : React.PropTypes.object,
		maxDate : React.PropTypes.object
	}
});

export default Weeks;
