// [MASTER JAVASCRIPT]
//	Project     :	TAXI Page
//	Version     :	1.0
//	Last Change : 	09/06/2017
//	Primary Use :   TAXI HTML Page


$(document).on('ready', function() {	
	"use strict"; //Start of Use Strict
	var menu_bar= $('.navbar-default');
	var menu_li= $('.navbar-default li a');
	var menu_li_1=$(".navbar-nav li a");
	var menu_hover= $('.navbar-default li a:hover');
	var collapse= $('.navbar-collapse');
	var top_nav=$('#top-nav');
	
	
	if(top_nav.length) {
	//After Scroll Menu Created, Menu Bgcolor and Text Color
    var x = top_nav.offset().top
	if (x > 50) {
        menu_bar.fadeIn().css({"background-color": "#ffffff", "color": "#666666", "box-shadow": "0px 0px 5px rgba(0,0,0,0.3)"});
		menu_li.css({"color": "#666666"});			
    }
	else {
		menu_bar.css({"background-color": "transparent", "color": "#ffffff", "box-shadow": "none", "display": "none" });
				
	}

	
	$(document).on('scroll',function() {	
		var y = $(this).scrollTop();   
		if (y > 50) {
			menu_bar.fadeIn().css({"background-color": "#ffffff", "color": "#666666", "box-shadow": "0px 0px 5px rgba(0,0,0,0.3)"});
			menu_li.css({"color": "#666666"});		
			
		}
		else {
			menu_bar.css({"background-color": "transparent", "color": "#ffffff", "box-shadow": "none", "display": "none"});
			menu_li.css({"color": "#666666"});
		}
	});
	
	}	
	
	// Header Menu click Function
	$('ul.nav a[href^="#"]').on('click' ,function(event){	
		if (!$(this).hasClass('dropdown-toggle')) {	
		
		var toggle = $(".navbar-toggle").is(":visible");
		if (toggle) {
		  $(".navbar-collapse").collapse('hide');
		}
		if($($.attr(this, 'href')).length){
			$('html, body').animate({			
				scrollTop: $( $.attr(this, 'href') ).offset().top -60
			}, 2000);
			return false;
			}		
		}
		event.preventDefault();				
	});	
	
	
	//MENU BAR SMOOTH SCROLLING FUNCTION		
		var menu_list=$('#menu-list');
		if(menu_list.length) {			
			$( "#menu-list" ).on( "click", ".pagescroll", function( event ) {					
					event.preventDefault();	
					var hash_tag= $(this).attr('href');
					$('html, body').animate({
					scrollTop: $(hash_tag).offset().top - 50
				}, 2000);	
				return false;
			});			
		}	
		
		
		//CONTACT FORM VALIDATION	
		if ($('#contact-form').length) {
			$('#contact-form').each(function(){
				$(this).validate({			
					errorClass: 'error',
					submitHandler: function(form){
						$.ajax({
							type: "POST",
							url:"mail/mail.php",
							data: $(form).serialize(),
							success: function(data) {							
							   if(data){
								   $('#sucessMessage').html('Mail Sent Successfully !!!');
								   $('#sucessMessage').show();
								   $('#sucessMessage').delay(3000).fadeOut();
							   }
							   else {
									$('#failMessage').html(data);
									$('#failMessage').show();
									$('#failMessage').delay(3000).fadeOut();
									}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
							   $('#failMessage').html('Error occurred');
							   $('#failMessage').show();
							   $('#failMessage').delay(3000).fadeOut();
							 }
						});
					}				
				});
			});
		}
		
		$('.cancel').on( "click", function() {
           var validator = $("#contact-form").validate();
           validator.resetForm();
         });
		 
		  //COUNTER JS	
		 if ($('.count').length){
				 $('.count').counterUp({
				delay: 10,
				time: 1000
			});
		 }
		 
		 // YOUTUBE BACKGROUND VIDEO FUNCTION	
			var player=$('.player');
			if(player.length) {
				player.mb_YTPlayer();					
			}
		 
	return false;

		// End of use strict
});

