// Initialize all input of date type.
var options;
var calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) { // Add listener to date:selected event calendars[i].on('date:selected',
 date=> {
	console.log(date);
	};
	}