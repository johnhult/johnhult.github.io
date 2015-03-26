$(document).ready(function() {
	var startAnimationHeight = window.innerHeight - (window.innerHeight/100)*10;
	var frontJohnBounce = new Bounce();
	frontJohnBounce.translate({
		from: {x: 0, y: 0},
		to: {x: 0, y: -startAnimationHeight},
		duration: 1500
	})
	.scale({
	    from: { x: 1, y: 1 },
	    to: { x: 0.1, y: 2.3 },
	    easing: "sway",
	    duration: 1500,
	    stiffness: 1
  	})
  	.applyTo($('.img-holder'));

  	var scaleSocial = new Bounce();
  	scaleSocial.scale({
  		from: {x: 1, y: 1 }, 
  		to: { x: 2, y: 2 },
  		duration: 2000,
  		stiffness: 1
  	})
  	.rotate({
  		from: 0,
  		to: 45,
  		duration: 2000,
  		easing: 'sway',
  		bounces: 6
  	});
  	var unscaleSocial = new Bounce();
  	unscaleSocial.scale({
  		from: {x: 2, y: 2 },
  		to: { x: 1, y: 1 },
  		duration: 1000,
  		stiffness: 2
  	});

  	$('.social-media>a').animate({
  		left: 0
  	}, 2000)

  	$('.social-media>a').on({
  		mouseenter: function() {
  			scaleSocial.applyTo($(this));
  		},
  		mouseleave: function() {
  			unscaleSocial.applyTo($(this));
  		}
  	});
  	$('.top-nav>a').on('click', function() {
  		var whereTo = $(this).children().eq(0).context.className;
  		whereTo = whereTo.substr(0, whereTo.lastIndexOf('-'));
  		spinTo(whereTo);
  	})
  	$('.about-nav').on('click', function() {
  		spinTo('about');
  	});
});

function spinTo(to) {
	var spin = $('.rolling');
	switch (to) {
		case 'front':
			spin.css({'transform' : 'translateZ(-50vw) rotateY(0deg)'});
			break;
		case 'about':
			spin.css({'transform' : 'translateZ(-50vw) rotateY(-90deg)'});
      if (firstTimeAbout) {
        animateAbout();
      };
			break;
		case 'projects':
			spin.css({'transform' : 'translateZ(-50vw) rotateY(-180deg)'});
			break;
		case 'art':
			spin.css({'transform' : 'translateZ(-50vw) rotateY(-270deg)'});
			break;
		case 'contact':
			spin.css({'transform' : 'translateZ(-100vw) rotateX(90deg)'});
			break;
	}
}

function animateAbout() {
  $('.about-svg').css('opacity', 1);
  setTimeout(function () {
    $('.me-stroke').css({'animation': 'draw 10s linear 1 forwards'});
  }, 1000);
  setTimeout(function () {
    $('.about-img').css({'opacity': 1});
    $('.about-svg').css('opacity', 0);
  }, 6000);
  firstTimeAbout = false;
}

var firstTimeAbout = true;