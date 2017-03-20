var router;
var navigoResolve;
var currentPage = 'home';
var overlayCurrentlyOpen = false;
var rootUrl = '';
var useHash = false;

function initRouting() {
	router = new Navigo(rootUrl, useHash);
	navigoResolve = router.resolve.bind(router);

	router.on(function () {
		console.log('default');
		// showCurrentNavigation('home');
		updateCurrentPage();
		setTimeout(function() {
			runHome()
		}, 600);
	})
	.resolve();

	router.on('/', function() {
		console.log('/ (home)');
		updateCurrentPage();
		// showCurrentNavigation('home');
		setTimeout(function() {
			runHome()
		}, 600);
	})
	.resolve();

	router.on('/bio', function() {
		console.log('bio');
		updateCurrentPage(true);
		runBio();
	})
	.resolve();

	router.on('/work', function() {
		console.log('work');
		updateCurrentPage();
		// showCurrentNavigation('work');
		setTimeout(function() {
			runWork()
		}, 600);
	})
	.resolve();

	router.on('/blog', function() {
		console.log('blog');
		updateCurrentPage();
		// showCurrentNavigation('blog');
		setTimeout(function() {
			runBlog()
		}, 600);
	})
	.resolve();


	router.notFound(function() {
		run404();
	});
	
}

function updateCurrentPage(openOverlay) {
	

	// Save current route in order to animate out content
	var oldPage = currentPage;

	// Set / to home and set new currentPage
	routeName = window.location.pathname;
	currentPage = (routeName === '/') ? 'home' : routeName.split('/').pop();

	if (oldPage != currentPage) {
		if (!openOverlay) {

			console.log('CURRENTLY NOT OPENING');

			// If an overlay is currently open we close it
			if (overlayCurrentlyOpen) {
				console.log('BUT THE OVERLAY IS OPEN AND WILL BE CLOSED');
				animateOutOverlay();
				overlayCurrentlyOpen = false;
			}
			else {
				console.log('ONLY MAIN NAVIGATION');

				// Animate out the old content
				animateOutContent(oldPage);
				
				// Switch menu
				showCurrentNavigation(currentPage);
			}

		}
		else {
			console.log('OPENING THAT SHIT');
			overlayCurrentlyOpen = true;
		}
	}
}

function animateOutContent(oldPage) {
	var content = $('.content-holder').children();
	content.addClass('animate-out');
}

// For setting menu highlight
function showCurrentNavigation(newPage) {
	$('.current-page').removeClass('current-page');
	$('.' + newPage + '-navigation').addClass('current-page');
}

function animateInOverlay(htmlData) {
	$.get(htmlData, function(data) {
		$('.overlay-page').css('top', '0');
		$('.overlay-page').css('pointer-events', 'auto');
		$('.overlay-page').append('<div class="first-wave-overlay abs-fill"></div>');
		$('.overlay-page').append('<div class="overlay-content abs-fill"></div>');
		$('.overlay-content').html(data);
		updateLinks();
	});
}
function animateOutOverlay() {

	// Remove overlay pointer events instantly
	$('.overlay-page').css('pointer-events', 'none');

	// Add classes that animate out overlays
	$('.overlay-content').addClass('anim-out-overlay-content');
	$('.first-wave-overlay').addClass('anim-out-first-wave');

	// Remove content
	setTimeout(function() {
		$('.overlay-content').remove();
	}, 800);
	setTimeout(function() {
		$('.first-wave-overlay').remove();
		
		// Make sure no shit is over main content
		$('.overlay-page').css('top', 'initial');
	}, 1200);

}

function updateLinks() {
	router.updatePageLinks();
};
