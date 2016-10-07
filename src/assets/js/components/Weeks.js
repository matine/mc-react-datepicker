/*
    Weeks
    <Weeks />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import DateUtilities from '../DateUtilities';
import Week from './Week';


var Weeks = React.createClass({

	getInitialState: function() {
		return {
			view: DateUtilities.clone(this.props.datePickerStates.view),
			allViews: DateUtilities.getAllviews(this.props.datePickerStates.view),
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
			newCurrentView = DateUtilities.clone(this.state.allViews.viewPrev);
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
			view: isForward ? DateUtilities.clone(this.state.allViews.viewNext) : DateUtilities.clone(this.state.allViews.viewPrev)
		});
	},

	render: function() {
		var currentClass = "current";
		var prevClass = "prev";
		var nextClass = "next";

		if (this.state.sliding) {
			currentClass += " sliding " + this.state.sliding;
			prevClass += " sliding " + this.state.sliding;
			nextClass += " sliding " + this.state.sliding;
		}

		return (
			<div className="weeks">
				<div className={prevClass}>{this.renderWeeks(this.state.allViews.viewPrev)}</div>
				<div ref="current" className={currentClass}>
					<div className="weeks-one">{this.renderWeeks(this.state.allViews.viewCurrent1)}</div>
					<div className="weeks-two">{this.renderWeeks(this.state.allViews.viewCurrent2)}</div>
				</div>
				<div className={nextClass}>{this.renderWeeks(this.state.allViews.viewNext)}</div>
			</div>
		)
	},

	renderWeeks: function(view) {
		var starts = this.getWeekStartDates(view);
		var month = starts[1].getMonth();
		var self = this;

		return starts.map(function(s, i) {
			return (
				<Week key={i} start={s} month={month} datePickerStates={this.props.datePickerStates} onSelect={self.props.onSelect}></Week>
			)
		}.bind(self));
	},

	propTypes : {
		datePickerStates : React.PropTypes.object.isRequired,
		onTransitionEnd : React.PropTypes.func.isRequired,
		onSelect : React.PropTypes.func.isRequired
	}
});

export default Weeks;
