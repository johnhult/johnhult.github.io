var works = [
	'adclouds',
	'gbgstartup',
	'gleeson',
	'enfo'
]

var currentWork = 0;

function runWork() {
	$.get('partials/work.html', function(data) {
		$('.content-holder').html(data);
		setCurrentWork();
		updateLinks();
		addWorkNav();
	});
}

function addWorkNav() {
	$('.next-btn').on('click', incWork);
	$('.prev-btn').on('click', decWork);
}

function setCurrentWork() {
	$('.work-box').css({'opacity': 0, 'pointer-events': 'none'});
	var currentWorkObj = $('.' + works[currentWork] + '-work');
	console.log(currentWorkObj);
	currentWorkObj.css({'opacity': 1, 'pointer-events': 'default'});
}

function incWork() {
	setWorkNumber(currentWork+1);
}
function decWork() {
	setWorkNumber(currentWork-1);
}
function setWorkNumber(number) {
	currentWork = number < 0 ? (works.length-1) : (number%works.length);
	console.log(currentWork);
	setCurrentWork();
}