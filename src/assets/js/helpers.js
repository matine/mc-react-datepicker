import React from 'react';

let helpers =  {

	isObjectEmpty : function(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
			return false;
		}
		return true;
	},

	getMonthString : function(dateObj) {
		var monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		var monthIndex = dateObj.getMonth();
		return monthStrings[monthIndex];
	},

	hasSomeParentTheClass: function(element, classname) {
		if (element.className.split(' ').indexOf(classname)>=0) return true
		if (element.parentNode === document.body) return false
		return element.parentNode && this.hasSomeParentTheClass(element.parentNode, classname);
	}
}

Array.prototype.getValueCount = function( search ) {

	var count = 0;
	for( var i=0; i<this.length; i++ ) {
		if( this[i] == search )
			count++;
	}
	return count;
}

export default helpers;
