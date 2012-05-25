
window.template = {

	// Template for results
	current: {
		// Select the template 
		select: $('#currentTemplate').html(),
		// Build the template
		build: function(loc, time, temp, cond, wind, icon, vbIndex) {

			// Return built template
			return this.select
						.replace( /{{location}}/ig, loc )
						.replace( /{{time}}/ig, time)
						.replace( /{{temp}}/ig, temp)
						.replace( /{{cond}}/ig, cond)
						.replace( /{{wind}}/ig, wind)
						.replace( /{{src}}/ig, icon)
						.replace( /{{vbIndex}}/ig, vbIndex);
		}
	},

	// 3 Day Forecast template
	threeDay: {

		// Build the template
		details: function(title, period, text, rain, icon) {

			// Return built template
			return $('#detailsTemplate').html()
						.replace( /{{title}}/ig, title)
						.replace( /{{period}}/ig, period)
						.replace( /{{text}}/ig, text)
						.replace( /{{rain}}/ig, rain)
						.replace( /{{src}}/ig, icon);
		},

		summary: function(day, icon, low, high, wind, rain, vbIndex) {

			return $('#summaryTemplate').html()
						.replace( /{{day}}/ig, day)
						.replace( /{{icon}}/ig, icon)
						.replace( /{{high}}/ig, high)
						.replace( /{{low}}/ig, low)
						.replace( /{{wind}}/ig, wind)
						.replace( /{{rain}}/ig, rain)
						.replace( /{{vbIndex}}/ig, vbIndex);
		}
	},

	// Alerts template
	alerts: {
		// Select the template 
		select: $('#alertsTemplate').html(),
		// Build the template
		build: function(date, description, expires, message) {

			// Return built template
			return this.select
						.replace( /{{description}}/ig, description)
						.replace( /{{date}}/ig, date)
						.replace( /{{expires}}/ig, expires)
						.replace( /{{message}}/ig, message);
		}
	}
}

