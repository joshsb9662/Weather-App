
window.geo = {

	key: "dj0yJmk9cXRnTnprbVlVQk1oJmQ9WVdrOVFXOTRlRlpUTnpnbWNHbzlNVGd4TlRRNU16ZzJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNw--",
	url: "http://where.yahooapis.com/geocode?q=",
	latLon: "",

	init: function() {

		if ( Modernizr.geolocation ) {

			$('#geoLocation').on('click', function(){
				geo.locator();
			});

		} else {
			// If geolocation API isn't found
			alert('Geolocation not supported.');
		}

	},

	locator: function() {
		
		navigator.geolocation.getCurrentPosition(function(location) {
			// Set latitude and longitude
			geo.latLon = location.coords.latitude + "," + location.coords.longitude;

			// Get yahoo to convert it 
			geo.reverse();

		}, function() {
			// If it is turned off or not working.
			alert('Geolocation is not available.');
		});

	},

	reverse: function() {
		// Reverse geo coding.  Turns lat and longitude into a working address (ZIP in our case)
		$.getJSON( geo.url + geo.latLon + "&gflags=R&flags=J&appid=" + geo.key, function( data ) {

			// Grab the zip code
			var zip = data.ResultSet.Results[0].uzip;

			// Put zip in the form
			$("form").find('input[type="text"]').val(zip);

			// Run the weather code
			weather.connect();

		});

	}
}

geo.init();
