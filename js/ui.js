
var pages = ['#currentConditions', '#forecast', '#alerts'],
	page_btn = ['#current_btn', '#forecast_btn', '#alerts_btn'],
	forecasts = ['.summary', '.details', '.hourly'],
	forecast_btn = ['.summary_btn', '.details_btn', '.hourly_btn'];

pageTransitions(pages, page_btn);
pageTransitions(forecasts, forecast_btn);

function pageTransitions (page, btn) {
	$.each(page, function( i, j ) {
	 	$( btn[i] ).on('click', function(){
			$( page.toString() ).hide();
			$( j ).show();
		});
	});
}