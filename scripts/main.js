$(document).ready(function() {
	$('html').css({
		height: '100vh',
		background: '#424242',
	});
	$('html').on('click', function() {
		$('.rollin')[0].innerHTML = Math.floor(Math.random()*6)+1;
	});
});