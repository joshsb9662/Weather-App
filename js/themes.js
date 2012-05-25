
window.themes = {

	// Parse data
	currentCond: function( json ) {

		// Store data in vars
		var j = json.current_observation,
			loc = j.display_location.full,
			time = j.observation_time,

			cond = function() {

				// Function for conditions status
				function condTempl(status) {
					cond = '<span class="' + status + '">' + j.weather + "</span>";
				}

				// If the weather equals any of these it's good
				if( j.weather === "Overcast" || j.weather ===  "Clear" || j.weather === "Partly Cloudy" || j.weather === "Mostly Cloudy" || j.weather === "Scattered Clouds" ) {
					condTempl("ok")
					conditions.vbRating.cond = true; // Conditions are good for volleyball index
				} else {
					condTempl("alert");
					conditions.vbRating.cond = false; // Conditions are bad for volleyball index
				}
				return cond;
			},

			icon = j.icon_url;

		// Add template to body
		$('#results #currentConditions').html( template.current.build( loc, time, conditions.temp(j.temp_f), cond, conditions.wind(j.wind_mph), icon, conditions.vbIndex ) );

	},

	threeDay: {

		summary: function( json ){

			// Clear the list of any old results
			var results = $('#results #forecast ul.summary').html('');

			$.each( json.forecast.simpleforecast.forecastday, function( i, j ) {

				var day = j.date.weekday,
					icon = j.icon_url,
					low = conditions.temp(j.low.fahrenheit),
					high = conditions.temp(j.high.fahrenheit),
					wind = conditions.wind(j.avewind.mph),
					rain = conditions.rain(j.pop);

		$('#results #forecast ul.summary').append( template.threeDay.summary( day, icon, low, high, wind, rain, conditions.vbIndex ) );


			});
		},

		details: function( json ) {

			// Clear the list of any old results
			var results = $('#results #forecast ul.details').html('');

			$.each( json.forecast.txt_forecast.forecastday, function( i, j ) {

				var title = "3 Day Forecast",
					period = j.title,
					text = j.fcttext,
					icon = j.icon_url;
						
				// Add template to body
				$('#results #forecast ul.details').append( template.threeDay.details( title, period, text, rain, icon ) );

			});
		}

	},

	alerts: function( json ) {

		// Clear the list of any old results
		$('#results #alerts ul').html('');

		// Clear Alert Icon
		var iconCheck = $('span').hasClass('alert_icon');

		if( iconCheck ) {
			$('span.alert_icon').remove();
		}

		// If Alerts are present
		if( json.alerts.length > 0 ) {

			// Add alert icon
			$('<span>', {
				html: json.alerts.length,
				class: "alert_icon"
			}).appendTo('#alerts_btn a');
			
			// Alerts
			for( var i = 0, len = json.alerts.length; i < len; i++ ) {
				
				var date = json.alerts[i].date,
					description = json.alerts[i].description,
					expires = json.alerts[i].expires,
					message = json.alerts[i].message;

				// Add template to body
				$('#results #alerts ul').append( template.alerts.build( date, description, expires, message ) );
			}
				
		} else {
			
			var message = "No Weather Alerts";

			// Add template to body
			$('#results #alerts ul').html( "<h3>" + message + "</h3>" );

		}

	}
}

