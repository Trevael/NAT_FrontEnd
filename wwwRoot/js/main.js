// ====== Layout Helpers ======

function prettyBullets(){
	$('ul.prettyBullets').each(function(){
		$(this).find('li').addClass('prettyBullets').prepend('<span class="prettyBullet">&bull;</span>&nbsp;');
	});
}


// ====== CAROUSEL ======

//TODO - write a simple image carousel


// ====== RUNTIME ======

$(document).ready(function(){
	prettyBullets();
});
