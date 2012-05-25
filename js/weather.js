
window.weather = {

	url: "http://api.wunderground.com/api/", // URL
	key: "827dd416813bb1c2", // Primary API key - 29c974bb433a9e7b
	forecast: {
		current: "conditions",
		threeDay: "forecast", 
		alerts: "alerts"
	},

	// Initiate the function
	init: function() {

		// On load, if local storage has location, load it
		if( Modernizr.localstorage ) {
			if( localStorage.location ) {			
				weather.connect();
			}
		}

		// On form submision
		$('form').on('submit', function(e){
			// Don't let the browser reload
			e.preventDefault();
			// Store for next time
			weather.storage.save();
			// Set it in motion 
			weather.connect();
		});

	},

	// Get the location from the form
	location: function() {

		var input = $("form").find('input[type="text"]').val();

		return input;
	
	},

	// Build REST url for API call
	restURL: function( type ) {

		// If the form input is empty pull from local storage
		if( this.location() === "" ){
			var location = this.storage.load();		
		} else {
			var location = this.location();			
		}
		// Build url
		var urlString = this.url + this.key + "/" + type + "/q/" + location + ".json?callback=?";

		return urlString;
	
	},

	// Connect to weather API
	connect: function() {

		// Loading animation
		$("#results #currentConditions").html('<img src="img/ajax-loader.gif" class="loader" >')

		// Call weather API, get current conditions
		$.getJSON( this.restURL( this.forecast.current ), function( data ) {

			console.log( data );

			// If the location doesn't exist
			if( data.response.error ) {
				$('#results #currentConditions').html( "<h1>" + data.response.error.description + "</h1>" );
			} else {

				// Parse and diplay data
				themes.currentCond( data );
			}
		
		});

		// Call weather API, get 3 day forecast conditions
		$.getJSON( this.restURL( this.forecast.threeDay ), function( data ) {
			
			console.log( data );
			themes.threeDay.summary( data );
			themes.threeDay.details( data );

		});


		// Call weather API, get any alerts conditions
		$.getJSON( this.restURL( this.forecast.alerts ), function( data ) {
			
			console.log( data );
			themes.alerts( data );

		});

	},
	
	// Local storage 
	storage: {

		// Saves the input for later use
		save: function() {
			// If browser supports local strage, save location
			if( Modernizr.localstorage ) {
				if( weather.location() !== '' ) {
					localStorage.location = weather.location();
				}		
			}

		},

		// Loads saved location
		load: function() {
			return localStorage.location;
		}

	}

}; // End Weather Object

weather.init();

setInterval( weather.init, 1000 * 60 * 60 );

