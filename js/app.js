$( document ).ready(function() {
  
	//**************SMOOTH SCROLL NAVIGATION************
	$(".nav_link").click(function(event){
		event.preventDefault();
		var current_position = window.pageYOffset;
		console.log(current_position);
		var dest = $(this.hash).offset().top-38;
		console.log("dest: "+dest); 
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
			console.log('hey');
			$('html,body').animate({scrollTop:current_position+sling}, time/2.3,'swing');
		}
		if(dest != -38){
			$('html,body').animate({scrollTop:dest+overshoot}, time,'swing');
		}
		$('html,body').animate({scrollTop:dest}, time/2,'swing');
	});

	//*************SET UP CAROUSEL ANIMATION FOR EACH GALLERY IN PORTFOLIO****************************

	// var galleryNums = ["1","2","3","4","5","6"];
    
	// for (i = 0; i < galleryNums.length; i++) { 

	// 	$("#owl-demo" + galleryNums[i]).owlCarousel({
	//       navigation : true, // Show next and prev buttons
	//       slideSpeed : 300,
	//       paginationSpeed : 400,
	//       singleItem:true,
	//       pagination : false
	// 	});
	// };

	
});

