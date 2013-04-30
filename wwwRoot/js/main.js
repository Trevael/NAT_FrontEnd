// ====== Layout Helpers ======

function prettyBullets(){
	$('ul.prettyBullets').each(function(){
		$(this).find('li').addClass('prettyBullets').prepend('<span class="prettyBullet">&bull;</span>&nbsp;');
	});
}


// ====== CAROUSEL ======

var CAROUSEL_WAIT		= 5000;
var DOT_WAIT			= CAROUSEL_WAIT - 500;
var CAROUSEL_ANIM		= 3000;
var m_nCarouselRuns		= 0;
var $m_oCarousel, $m_oDots;
var m_nCarouselItems	= 0;
var m_nCarouselTimer 	= -1;

function setupCarousel(){
	var nWidth = 0;
	$m_oCarousel = $('#carouselImages')
	$m_oCarousel.find(':first-child').clone().appendTo($m_oCarousel);
	$m_oCarousel.children().each(function(){ nWidth += $(this).outerWidth(); });
	$m_oCarousel.css('width',nWidth);
	m_nCarouselItems = ($m_oCarousel.children()).length;
	setupDots();
}

function setupDots(){
	if($m_oDots == undefined){
		$m_oDots = $('<div class="dots" />');
		for(var i = 1; i < m_nCarouselItems; i++){
			$m_oDots.append('<div class="dot ir" id="dot_'+i+'"></div>');
		}
		$('#carousel').append($m_oDots);
	}
	$m_oDots.children().each(function(){ $(this).removeClass('on'); });
	$('#dot_'+m_nCarouselRuns).addClass('on');
}

function animateCarousel(){
	if(m_nCarouselRuns < m_nCarouselItems - 1){
		var nStartPos = ($m_oCarousel.position()).left;
		var nEndPos = nStartPos - ($m_oCarousel.outerWidth() / m_nCarouselItems);
		$m_oDots.delay(DOT_WAIT).fadeOut('fast');
		$m_oCarousel.delay(CAROUSEL_WAIT).animate({left:nEndPos},CAROUSEL_ANIM,function(){
			$m_oDots.fadeIn('fast');
			animateCarousel();
		});
		m_nCarouselRuns++;
		setupDots();
	} else {
		$m_oCarousel.css('left',0);
		m_nCarouselRuns = 0;
		animateCarousel();
	}
}


// ====== RUNTIME ======

$(document).ready(function(){
	prettyBullets();
	if( $('#carouselImages').length > 0 ){
		setupCarousel();
		animateCarousel();
	}
});
