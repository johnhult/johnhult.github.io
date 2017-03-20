function runHome() {
	$.get('partials/home.html', function(data) {
		$('.content-holder').html(data);
		updateLinks();
		startCounting();
	});
}


function startCounting() {
	var now;
	var birthday;
	var secs;
	var counter = $('.second-ticker');
	birthday =  Math.floor(new Date(89, 11, 27, 20, 10).getTime() / 1000);
	now = Math.floor(new Date().getTime() / 1000);
	secs = now - birthday;
	counter.text(secs + '');
	setInterval(function() {
		birthday =  Math.floor(new Date(89, 11, 27, 20, 10).getTime() / 1000);
		now = Math.floor(new Date().getTime() / 1000);
		secs = now - birthday;
		counter.text(secs + '');
	}, 1000);
}