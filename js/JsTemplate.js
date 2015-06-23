$(document).ready(function() {
        
  //fixa o menu no topo quando scrol
  $('#nav').affix({
		  offset: {
			top: $('header').height()-$('#nav').height()
		  }
  });	
});

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav' })

//scrol suave para cima
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

//scrol suave quando clicado nos links
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top;
  $('body,html').animate({scrollTop:posi},700);
});