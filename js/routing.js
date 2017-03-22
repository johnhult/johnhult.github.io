var router;
var rootUrl = '';
var useHash = false;

var currentPage;
var currentMainNavNumber = 0;
var pageUnderOverlay;
var overlayCurrentlyOpen;
var mainNavArrowsEventAdded = false;

var mainNav = [
	'home',
	'work',
	'blog'
];

function initRouting() {
	router = new Navigo(rootUrl, useHash);

	router.on({
		'': function() {
			console.log('/ (home)');
			mainNavigation(0);
			setTimeout(function() {
				runHome();
			}, 600);
		},
		'/home': function() {
			router.navigate('');
		},
		'/bio': function() {
			console.log('bio');
			openOverlay('', 'bio');
			runBio();
		},
		'/work': function() {
			console.log('work');
			mainNavigation(1);
			setTimeout(function() {
				runWork();
			}, 600);
		},
		'/work/:id': function(params) {
			console.log(params.id);
			if(params.id) {
				openOverlay('work', 'work/' + params.id);
				runWorkId(params.id);
			}
		},
		'/blog': function() {
			console.log('blog');
			mainNavigation(2);
			setTimeout(function() {
				runBlog();
			}, 600);
		}
	})
	.notFound(function() {
		console.log('page not found');
	})
}

function addMainArrowNav() {
	$(document).keydown(function(e) {
	    switch((e.keyCode ? e.keyCode : e.which)){
	        //case 13: // Enter
	        //case 27: // Esc
	        //case 32: // Space
	        case 37:
	        	// Left Arrow
	        	if(currentMainNavNumber === 1) {
	        		decWork();
	        	}
	        	break;
	        case 38:
	        	// Up Arrow
	        	if(!overlayCurrentlyOpen) {
	        		decMainNav();
	        	}
	        	break;
	        case 39:
	        	// Right Arrow
	        	if(currentMainNavNumber === 1) {
	        		incWork();
	        	}
	        	break;
	        case 40:
	        	// Down Arrow
	        	if(!overlayCurrentlyOpen) {
	        		incMainNav();
	        	}
        		break;
	    }
	});
}

function decMainNav() {
	var newPageNr = (currentMainNavNumber <= 0 ? mainNav.length-1 : currentMainNavNumber-1);
	router.navigate('/' + mainNav[newPageNr]);

}
function incMainNav() {
	var newPageNr = (currentMainNavNumber >= mainNav.length-1 ? 0 : currentMainNavNumber+1);
	router.navigate('/' + mainNav[newPageNr]);
}

// Changing the main content routes
// newRoute: navigation pressed
function mainNavigation(routeNr) {

	if (!mainNavArrowsEventAdded) {
		addMainArrowNav();
		mainNavArrowsEventAdded = true;
	}

	// Save current route in order to animate out content
	var oldPageNr = currentMainNavNumber;

	// Set new page and page nr
	currentMainNavNumber = routeNr;
	currentPage = mainNav[currentMainNavNumber];

	console.log('currentMainNavNumber: '+ currentMainNavNumber + '\ncurrentPage: ' + currentPage + '\noldPageNr: ' + oldPageNr);
	// Only switch if we actually change page
	if (oldPageNr != currentMainNavNumber) {
		animateOutContent();
		highlightMenu(mainNav[currentMainNavNumber]);
	}
}

// Set states for opening overlays. Animations handled in CSS.
function openOverlay(pageUnder, overlayPage) {
	currentPage = overlayPage;
	pageUnderOverlay = pageUnder;
	overlayCurrentlyOpen = true;
	removeMainNavEventHandlers();
}

// Close overlay
function closeOverlay() {
	animateOutOverlay();
	overlayCurrentlyOpen = false;
	router.navigate(path='/' + pageUnderOverlay, absolute=false);
}

function animateOutContent() {
	var content = $('.content-holder').children();
	content.addClass('animate-out');
}

// For setting menu highlight
function highlightMenu() {
	$('.current-page').removeClass('current-page');
	$('.' + mainNav[currentMainNavNumber] + '-navigation').addClass('current-page');
}

function animateInOverlay(htmlData) {
	$.get(htmlData, function(data) {
		$('.overlay-page').css('top', '0');
		$('.overlay-page').css('pointer-events', 'auto');
		setTimeout(function() {
			$('.overlay-page').prepend('<div class="close-overlay"><div class="before-close"></div><div class="after-close"></div></div>');
			$('.close-overlay').on('click', function () {
				closeOverlay();
			});
		}, 1000);
		$('.overlay-page').append('<div class="first-wave-overlay abs-fill"></div>');
		$('.overlay-page').append('<div class="overlay-content abs-fill"></div>');
		$('.overlay-content').html(data);
		updateLinks();
	});
}
function animateOutOverlay() {

	// Remove overlay pointer events and close button instantly
	$('.overlay-page').css('pointer-events', 'none');
	$('.close-overlay').remove();

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
