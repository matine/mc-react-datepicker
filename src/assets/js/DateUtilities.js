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
		var viewPrev2 = this.getPrevMonth(date),
			viewPrev1 = this.getPrevMonth(viewPrev2),
			viewCurrent1 = date,
			viewCurrent2 = this.getNextMonth(date),
			viewNext1 = this.getNextMonth(viewCurrent2),
			viewNext2 = this.getNextMonth(viewNext1);

		return {
			viewPrev1 : viewPrev1,
			viewPrev2 : viewPrev2,
			viewCurrent1 : viewCurrent1,
			viewCurrent2 : viewCurrent2,
			viewNext1 : viewNext1,
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
	}
}


export default DateUtilities;
