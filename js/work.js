var works = [
	'adclouds',
	'gleeson',
	'gbgstartup',
	'enfo'
]

var currentWork = 0;

function runWork() {
	$.get('partials/work.html', function(data) {
		$('.content-holder').html(data);
		renderCurrentWorkBox();
		updateLinks();
		addWorkArrowBtnsNav();
	});
}

function runWorkId(id) {
	animateInOverlay('/partials/work/' + id + '.html');
}

function addWorkArrowBtnsNav() {

	// Add navigation for each job
	// $.each(works, function(index, value) {
	// 	var insertDiv = '<div class="work-nav-indicator ' + value +  '-indicator"></div>';
	// 	$('.work-nav-list').append(insertDiv);
	// 	$(insertDiv).on('click', function() {
	// 		setWorkNumber(index);
	// 	});
	// });

	$('.content-holder').append(
		'<div class="prev-btn work-nav-btn"><div class="inner-work-nav-arrow"></div></div>' +
		'<div class="next-btn work-nav-btn"><div class="inner-work-nav-arrow"></div></div>');
	$('.next-btn').on('click', incWork);
	$('.prev-btn').on('click', decWork);
}


function renderCurrentWorkBox() {
	$('.work-box').css({'opacity': 0, 'pointer-events': 'none'});
	var currentWorkObj = $('.' + works[currentWork] + '-work');
	currentWorkObj.css({'opacity': 1, 'pointer-events': 'auto'});
}

function incWork() {
	setWorkNumber(currentWork+1);
}
function decWork() {
	setWorkNumber(currentWork-1);
}
function setWorkNumber(number) {
	currentWork = number < 0 ? (works.length-1) : (number%works.length);
	renderCurrentWorkBox();
}