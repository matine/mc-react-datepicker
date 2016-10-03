/*
    Date Picker
    <DatePicker />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from '../Helpers';
import DateUtilities from '../DateUtilities';
import Calendar from './Calendar';

var DatePicker = React.createClass({

	getInitialState: function() {
		var def = this.props.selected || new Date();
		var view1 = DateUtilities.clone(def);
		var view2 = DateUtilities.getNextMonth(view1);

		return {
			view1: view1,
			view2: view2,
			selected1: DateUtilities.clone(view1),
			selected2: DateUtilities.clone(view2),
			minDate: null,
			maxDate: null,
			visible: false
		};
	},

	componentDidMount: function() {
		document.addEventListener("click", function(e) {
			var isInCalendars = Helpers.hasSomeParentTheClass(e.target, "ardp-date-picker");
			if ( this.state.visible && isInCalendars === false)
				console.log(e.target.className);
				// this.hide();
		}.bind(this));
	},

	setMinDate: function(date) {
		this.setState({ minDate: date });
	},

	setMaxDate: function(date) {
		this.setState({ maxDate: date });
	},

	onSelect1: function(day) {
		this.setState({ selected1: day });
	},
	onSelect2: function(day) {
		this.setState({ selected2: day });
	},

	show: function() {
		this.setState({ visible: true });
	},

	hide: function() {
		this.setState({ visible: false });
	},

	render : function() {
		var calendarObjStart = {
			calendar: "start",
			view: this.state.view1,
			selected: this.state.selected1,
			selectedOther: this.state.selected2
		}
		var calendarObjEnd = {
			calendar: "end",
			view: this.state.view2,
			selected: this.state.selected2,
			selectedOther: this.state.selected1
		}

		return (
			<div className="ardp-date-picker">
				<div className="datepicker-inputs">
					<input type="text" className="date-picker-trigger" readOnly="true" value={DateUtilities.toString(this.state.selected1)} onClick={this.show} />
					<input type="text" className="date-picker-trigger" readOnly="true" value={DateUtilities.toString(this.state.selected2)} onClick={this.show} />
				</div>
				<div className={this.state.visible ? "calendars visible" : "calendars"}>
					<Calendar calendarObj={calendarObjStart} onSelect={this.onSelect1} minDate={this.state.minDate} maxDate={this.state.maxDate}></Calendar>
					<Calendar calendarObj={calendarObjEnd} onSelect={this.onSelect2} minDate={this.state.minDate} maxDate={this.state.maxDate}></Calendar>
				</div>
			</div>
		)
	},

	propTypes : {}
});

export default DatePicker;
