import React from 'react';

let Helpers =  {

	isObjectEmpty : function(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
			return false;
		}
		return true;
	},

	AddClassNameIfExists : function(currentClassName, newClassName) {
		newClassName ? currentClassName += (" " + newClassName) : currentClassName = currentClassName;
		return currentClassName;
	},

	UseIfExists : function(objToCheck, defaultObj) {
		return outcome = objToCheck ? objToCheck : defaultObj;
	},

	getMonthString : function(dateObj) {
		var monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		var monthIndex = dateObj.getMonth();
		return monthStrings[monthIndex];
	},

	parentsHaveClassName: function(element, className) {
		var parent = element;
		while (parent) {
			if (parent.className && parent.className.indexOf(className) > -1) {
				return true;
			}
			parent = parent.parentNode;
		}
	}
}

export default Helpers;
