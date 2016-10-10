import React from 'react';

let DateUtilities =  {

	pad: function(value, length) {
		while (value.length < length)
			value = "0" + value;
		return value;
	},

	clone: function(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	},

	isDateObj: function(date) {
		return typeof date !== "string"
	},

	toString: function(date) {
		return DateUtilities.pad(date.getDate().toString(), 2) + "/" + DateUtilities.pad((date.getMonth()+1).toString(), 2) + "/" + date.getFullYear();
	},

	toDayOfMonthString: function(date) {
		return DateUtilities.pad(date.getDate().toString());
	},

	toMonthAndYearString: function(date) {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[date.getMonth()] + " " + date.getFullYear();
	},

	getNextMonth: function(date) {
		var currentMonth = date.getMonth();
		var currentYear = date.getFullYear();
		var nextMonth;
		if (currentMonth < 11) {
			nextMonth = currentMonth + 1;
		} else {
			nextMonth = 0;
			currentYear++;
		}
		var d = new Date();
		d.setMonth(nextMonth);
		d.setFullYear(currentYear);
		return d;
	},

	getPrevMonth: function(date) {
		var currentMonth = date.getMonth();
		var currentYear = date.getFullYear();
		var prevMonth;
		if (currentMonth > 0) {
			prevMonth = currentMonth - 1;
		} else {
			prevMonth = 11;
			currentYear--;
		}
		var d = new Date();
		d.setMonth(prevMonth);
		d.setFullYear(currentYear);
		return d;
	},

	getAllviews: function(date) {
		var viewPrev = this.getPrevMonth(date),
			viewCurrent = date,
			viewNext = this.getNextMonth(date),
			viewNext2 = this.getNextMonth(viewNext);

		return {
			viewPrev : viewPrev,
			viewCurrent : viewCurrent,
			viewNext : viewNext,
			viewNext2 : viewNext2
		}
	},

	moveToDayOfWeek: function(date, dayOfWeek) {
		while (date.getDay() !== dayOfWeek)
			date.setDate(date.getDate()-1);
		return date;
	},

	isSameDay: function(first, second) {
		return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
	},

	isBefore: function(first, second) {
		return first.getTime() < second.getTime();
	},

	isAfter: function(first, second) {
		return first.getTime() > second.getTime();
	},

	isLastDayOfMonth: function(day) {
		var test = new Date(day.getTime());
		test.setDate(test.getDate() + 1);
		return test.getDate() === 1;
	}
}


export default DateUtilities;
