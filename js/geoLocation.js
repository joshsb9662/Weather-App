
window.geo = {

	key: "AIzaSyC0pSSNy0T6KpbkRbxVaGyJCzyiZhW9wrc",
	url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=",
	latLon: "",

	init: function() {

		if ( Modernizr.geolocation ) {
			geo.locator();
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
		$.getJSON( geo.url + geo.latLon + "&sensor=true&callback=?", function( data ) {

			json = jQuery.parseJSON(data);

			n = json.results.address_components.length;

			console.log( n );
		
	
			// data.results.address_components.

		});

	}
}

geo.init();
