var vw;
var vh;
var resizeTimer;

$(document).ready(function() {

	vw = $(window).width();
	vh = $(window).height();

	initRouting();
	setupPixi();


	$(window)[0].addEventListener('resize', function() {

		// Make sure we don't run every single resize event.
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {

			// Run code here, resizing has "stopped"
			vw = $(window).width();
			vh = $(window).height();
			rerender();
		}, 200);
	});
	
});

function addContents() {
	addNavmenu();
	addContact();
	addRotateMouse();
}

function addNavmenu() {
	$.get('partials/navmenu.html', function(data) {

		// Add the navmenu to body and add click events
		$('body').prepend(data);
		$('.nav-up').on('click', function() {
			decMainNav();
		});
		$('.nav-down').on('click', function() {
			incMainNav();
		});

		// Set main navigation to correct highlight since it's the first time loading
		highlightMenu(currentPage);
		setTimeout(function() {
			$('.nav-menu li').each(function(index) {
				var obj = $(this);
				setTimeout(function() {
					moveIntoPosition(obj);
				}, (index * 400));
				if (index === $('.nav-menu li').length-1) {
					setTimeout(function() {
						moveIntoPosition($('.nav-arrows'));
					}, ((index+1) * 400));
				}
			});
		}, 600);
		updateLinks();
	});
}

function addContact() {
	$.get('partials/contact.html', function(data) {
		$('body').prepend(data);
		moveIntoPosition($('.mail-contact'), {'transform': 'translate(0) rotate(90deg)', 'opacity': 1});
	});
	$.get('partials/socialmedia.html', function(data) {
		$('body').prepend(data);
		moveIntoPosition($('.social-media'));
		toSvg();
	});
}

// function addMainContent() {
// 	console.log('add main content');
// 	switch (currentPage) {
// 		case currentPage === 'home':
// 			runHome();
// 			break;
// 		case currentPage === 'work':
// 			runWork();
// 			break;
// 		case currentPage === 'blog':
// 			runBlog();
// 			break;
// 		default:
// 			runHome();
// 			break;
// 	}
// }


// e is the $-obj that is getting animated in
// attrs is a object for setting important e.g: {'transform': 'rotate(90deg)'}
function moveIntoPosition(e, attrs) {
	setTimeout(function() {
		e.addClass('move-back');
	}, 50);

	
	if(attrs) {
		for (var attr in attrs) {
			timeoutParam(e, attr, attrs[attr]);
		}
	};
}

function timeoutParam(elem, prop, value) {
	setTimeout(function() {
		elem[0].style.setProperty(prop, value, 'important');
	}, 50);
}


// Change tab title when people leave.
$(window).focus(function() {
    $('head title').html('iamjohnhult');
});

$(window).blur(function() {
    $('head title').html('Please come back!');
});

function addRotateMouse() {
	$(document).mousemove(function(event) {
		rotateDiv(event);
	});
}

function rotateDiv(event) {
    var x = event.clientX;
    var y = event.clientY;
    var midpointOfElementX = ($('.follow-mouse-wrapper').offset().left + ($('.follow-mouse-wrapper').width()/2));
    var midpointOfElementY = ($('.follow-mouse-wrapper').offset().top + ($('.follow-mouse-wrapper').height()/2));
    var posX = x - midpointOfElementX;
    var posY = y - midpointOfElementY;
	var valX = (posX / midpointOfElementX) * 10;
	var valY = (posY / midpointOfElementY) * 10;
	var logo = $('.follow-mouse-wrapper');
	logo.css({transform: "rotateY(" + valX + "deg) rotateX(" + -valY + "deg)"});
}






/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
// function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

//     if (arguments.length === 2) {
//         x = y = 0;
//         w = ctx.canvas.width;
//         h = ctx.canvas.height;
//     }

//     // default offset is center
//     offsetX = typeof offsetX === "number" ? offsetX : 0.5;
//     offsetY = typeof offsetY === "number" ? offsetY : 0.5;

//     // keep bounds [0.0, 1.0]
//     if (offsetX < 0) offsetX = 0;
//     if (offsetY < 0) offsetY = 0;
//     if (offsetX > 1) offsetX = 1;
//     if (offsetY > 1) offsetY = 1;

//     var iw = img.width,
//         ih = img.height,
//         r = Math.min(w / iw, h / ih),
//         nw = iw * r,   // new prop. width
//         nh = ih * r,   // new prop. height
//         cx, cy, cw, ch, ar = 1;

//     // decide which gap to fill    
//     if (nw < w) ar = w / nw;                             
//     if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
//     nw *= ar;
//     nh *= ar;

//     // calc source rectangle
//     cw = iw / (nw / w);
//     ch = ih / (nh / h);

//     cx = (iw - cw) * offsetX;
//     cy = (ih - ch) * offsetY;

//     // make sure source rectangle is valid
//     if (cx < 0) cx = 0;
//     if (cy < 0) cy = 0;
//     if (cw > iw) cw = iw;
//     if (ch > ih) ch = ih;

//     // fill image in dest. rectangle
//     ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
// };