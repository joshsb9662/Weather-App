(function(){

window.UI = {

	pages: ['#currentConditions', '#forecast', '#alerts'],
	page_btn: ['#current_btn', '#forecast_btn', '#alerts_btn'],
	forecasts: ['.summary', '.details', '.hourly'],
	forecast_btn: ['.summary_btn', '.details_btn', '.hourly_btn'],

	// Main nav function
	pageTransitions: function (page, btn) {
		$.each(page, function( i, j ) {
		 	$( btn[i] ).on('click', function(){
				$( page.toString() ).hide();
				$( j ).show();
			});
		});
	},

	init: function() {

		$(UI.page_btn[0]).find('a').addClass('ui-btn-active');

		$.event.special.swipe.horizontalDistanceThreshold = 130;

		UI.pageTransitions(UI.pages, UI.page_btn);
		UI.pageTransitions(UI.forecasts, UI.forecast_btn);

		UI.swipeLeft();
		UI.swipeRight();

	},

	swipeLeft: function() {
		// Swipe UI
		$("body").swipeleft(function(){

			if( $(UI.pages[0]).is(":visible") ) {
				UI.clear();
				$(UI.pages[1]).show();
				$(UI.page_btn[1]).find('a').addClass('ui-btn-active');
			} else if ( $(UI.pages[1]).is(":visible") ) {
				UI.clear();
				$(UI.pages[2]).show();
				$(UI.page_btn[2]).find('a').addClass('ui-btn-active');
			} else if( $(UI.pages[2]).is(":visible") ) {
				// Do nothing
			}

		});
	},

	swipeRight: function() {

		$("body").swiperight(function(){

			if( $(UI.pages[0]).is(":visible") ) {
				// Do nothing
			} else if ( $(UI.pages[1]).is(":visible") ) {
				UI.clear();
				$(UI.pages[0]).show();
				$(UI.page_btn[0]).find('a').addClass('ui-btn-active');
			} else if( $(UI.pages[2]).is(":visible") ) {
				UI.clear();
				$(UI.pages[1]).show();
				$(UI.page_btn[1]).find('a').addClass('ui-btn-active');
			}

		});
	},

	clear: function() {
		$(UI.pages.toString()).hide();
		$(UI.page_btn.toString()).find('a').removeClass('ui-btn-active');
	}
}

UI.init();

})();