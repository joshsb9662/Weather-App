// Pages and buttons for main nav
var pages = ['#currentConditions', '#forecast', '#alerts'],
	page_btn = ['#current_btn', '#forecast_btn', '#alerts_btn'],
	forecasts = ['.summary', '.details', '.hourly'],
	forecast_btn = ['.summary_btn', '.details_btn', '.hourly_btn'];

pageTransitions(pages, page_btn);
pageTransitions(forecasts, forecast_btn);

// Main nav function
function pageTransitions (page, btn) {
	$.each(page, function( i, j ) {
	 	$( btn[i] ).on('click', function(){
			$( page.toString() ).hide();
			$( j ).show();
		});
	});
}

// Swipe UI
$.event.special.swipe.horizontalDistanceThreshold = 130

$("body").swipeleft(function(){

	if( $(pages[0]).is(":visible") ) {
		$(pages.toString()).hide();
		$(pages[1]).show();	
	} else if ( $(pages[1]).is(":visible") ) {
		$(pages.toString()).hide();
		$(pages[2]).show();
	} else if( $(pages[2]).is(":visible") ) {
		// Do nothing
	}

});

$("body").swiperight(function(){

	if( $(pages[0]).is(":visible") ) {
		// Do nothing
	} else if ( $(pages[1]).is(":visible") ) {
		$(pages.toString()).hide();
		$(pages[0]).show();
	} else if( $(pages[2]).is(":visible") ) {
		$(pages.toString()).hide();
		$(pages[1]).show();
	}

});

