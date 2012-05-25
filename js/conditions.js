window.conditions = {

	// Declare some objects
	vbRating: { 
		warning: { 
			rain: false, 
			temp: false 
		} 
	},

	temp: function(temperature) {

		// Check temps
		if( temperature < 62 ) {
			tempTempl("alert", temperature);
			this.vbRating.temp = false; // Temp is bad for volleyball index
			this.vbRating.warning.temp = false;	
		} else if ( temperature > 90 ) {
			tempTempl("warning", temperature);
			this.vbRating.temp = true; // Temp is a warning for volleyball index
			this.vbRating.warning.temp = true;	
		} else {
			tempTempl("good", temperature);
			this.vbRating.temp = true; // Temp is good for volleyball index
			this.vbRating.warning.temp = false;	
		}

		// Function for temperature status
		function tempTempl(status, temperature) {
			temp = '<span class="' + status + '">' + temperature + '&deg;F</span>';
		}

		return temp;

	},

	wind: function(windCond) {

		// If wind is less then 20 mph, good
		if( windCond < 21 ) {
			windTempl('ok', windCond);
			this.vbRating.wind = true; // Winds are good for volleyball index
		} else {
			windTempl('alert', windCond);
			this.vbRating.wind = false; // Winds are bad for volleyball index
		}

		// Function for wind status
		function windTempl(status, windCond) {
			wind = '<span class="' + status + '">Wind at ' + windCond + ' mph</span>';
		}

		return wind;
	},

	rain: function(rainCond){

		if( rainCond >= 20 && rainCond <= 30 ) {
			rainTempl("warning");
			this.vbRating.rain = true; // No rain is good for volleyball index
			this.vbRating.warning.rain = true;
		} else if ( rainCond > 30 ) {
			rainTempl("alert");
			this.vbRating.rain = false; // Rain is bad for volleyball index
			this.vbRating.warning.rain = false;
		} else {
			rainTempl("good");
			this.vbRating.rain = true; // No rain is good for volleyball index
			this.vbRating.warning.rain = false;
		}

		// Rain chance status template
		function rainTempl(status) {
			rain = '<span class="' + status + '">Rain chance ' + rainCond + '%</span>';
		}

		return rain;
	},

	vbIndex: function(){
				
		// Changing scope of variable
		var index;

		if( conditions.vbRating.temp && conditions.vbRating.cond && conditions.vbRating.wind) {
			if( conditions.vbRating.warning.temp || conditions.vbRating.warning.rain ) {
				vbIndexTempl('warning', 'Currently Conditions are Questionable');
			} else {
				vbIndexTempl('good', 'Currently Conditions are Good');
			}
		} else {
			vbIndexTempl('alert', 'Currently Conditions are NOT Good');
		}

		// vb index status function
		function vbIndexTempl(status, message) {
			index = '<span class="' + status + '">' + message + '</span>';
		}

		return index;

	}
}