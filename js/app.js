$( document ).ready(function() {
 
	$(".nav_link").click(function(event){
		event.preventDefault();
		var current_position = window.pageYOffset; 
		var dest = $(this.hash).offset().top-38; 
		var distance = Math.abs(dest - current_position);
		var speed = 2.5;
		var time = distance/speed;
 
		if(current_position<dest){
			var sling	= -(distance/20);
			var overshoot = distance/20;
		}else{
			sling = distance/20;
			overshoot = -distance/20;
		}
		if(current_position != 0){ 
			$('html,body').animate({scrollTop:current_position+sling}, time/2.3,'swing');
		}
		if(dest != -38){
			$('html,body').animate({scrollTop:dest+overshoot}, time,'swing');
		}
		$('html,body').animate({scrollTop:dest}, time/2,'swing');
	});
 	
});

