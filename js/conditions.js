window.conditions = {

	// Declare some objects
	vbRating: { 
		warning: { 
			rain: false, 
			temp: false 
		} 
	},

	cond: function(weather) {

		// If the weather equals any of these it's good
		if( weather === "Overcast" || weather ===  "Clear" || weather === "Partly Cloudy" || weather === "Mostly Cloudy" || weather === "Scattered Clouds" ) {
			condTempl("ok", weather)
			conditions.vbRating.cond = true; // Conditions are good for volleyball index
		} else {
			condTempl("alert", weather);
			conditions.vbRating.cond = false; // Conditions are bad for volleyball index
		}
				
		// Function for conditions status
		function condTempl(status, weather) {
			cond = '<span class="' + status + '">' + weather + "</span>";
		}

		return cond;

	},

	temp: {

						// Function for temperature status
		tempTempl: function (status, temperature) {
			temp = '<span class="' + status + '">' + temperature + '&deg;F</span>';
		},
		
		high: function(temperature) {

			if ( temperature > 90 ) {
				conditions.temp.tempTempl("warning", temperature);
				conditions.vbRating.temp = true; // Temp is a warning for volleyball index
				conditions.vbRating.warning.temp.high = true;
			} else if ( temperature < 63 ) {
				conditions.temp.tempTempl("alert", temperature);
				conditions.vbRating.temp = false; // Temp is a warning for volleyball index
				conditions.vbRating.warning.temp.high = false;
			} else {
				conditions.temp.tempTempl("good", temperature);
				conditions.vbRating.temp = true; // Temp is good for volleyball index
				conditions.vbRating.warning.temp.high = false;
			}

			return temp;
		
		},

		low: function(temperature){

			if( temperature < 60 ) {
				conditions.temp.tempTempl("alert", temperature);
				conditions.vbRating.temp = false; // Temp is bad for volleyball index
				conditions.vbRating.warning.temp.low = false;	
			} else {
				conditions.temp.tempTempl("good", temperature);
				conditions.vbRating.temp = true; // Temp is good for volleyball index
				conditions.vbRating.warning.temp.low = false;
			}

			return temp;

		},

		current: function(temperature) {
			// Check temps
			if( temperature < 64 ) {
				conditions.temp.tempTempl("alert", temperature);
				conditions.vbRating.temp = false; // Temp is bad for volleyball index
				conditions.vbRating.warning.temp = false;	
			} else if ( temperature > 90 ) {
				conditions.tempTempl("warning", temperature);
				conditions.vbRating.temp = true; // Temp is good for volleyball index
				conditions.vbRating.warning.temp = true;	
			} else {
				conditions.temp.tempTempl("good", temperature);
				conditions.vbRating.temp = true; // Temp is good for volleyball index
				conditions.vbRating.warning.temp = false;	
			}

			return temp;
		}

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
			rainTempl("warning", rainCond);
			this.vbRating.rain = true; // No rain is good for volleyball index
			this.vbRating.warning.rain = true;
		} else if ( rainCond > 30 ) {
			rainTempl("alert", rainCond);
			this.vbRating.rain = false; // Rain is bad for volleyball index
			this.vbRating.warning.rain = false;
		} else {
			rainTempl("good", rainCond);
			this.vbRating.rain = true; // No rain is good for volleyball index
			this.vbRating.warning.rain = false;
		}

		// Rain chance status template
		function rainTempl(status, rainCond) {
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