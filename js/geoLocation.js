
window.geo = {

	key: "dj0yJmk9cXRnTnprbVlVQk1oJmQ9WVdrOVFXOTRlRlpUTnpnbWNHbzlNVGd4TlRRNU16ZzJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNw--",
	url: "http://where.yahooapis.com/geocode?q=",
	latLon: "",

	init: function() {

		if ( Modernizr.geolocation ) {

			$('#geoLocation').on('click', function(){
				geo.locator();
			});
		}

	},

	locator: function() {
		
		navigator.geolocation.getCurrentPosition(function(location) {
			// Set latitude and longitude
			geo.latLon = location.coords.latitude + "," + location.coords.longitude;

			// Get google to convert it 
			geo.reverse();

		});

	},

	reverse: function() {
		$.getJSON( geo.url + geo.latLon + "&gflags=R&flags=J&appid=" + geo.key, function( data ) {

			var zip = data.ResultSet.Results[0].uzip;

			$("form").find('input[type="text"]').val(zip);

			weather.connect();

		});

	}
}

geo.init();
