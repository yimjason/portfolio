$( document ).ready(function() {
  // var current_position = window.pageYOffset; 
  // console.log($("#artwork").offset().top);
		// var artwork = $("#artwork").offset().top-38;
		// console.log("curr:" + current_position);
		// if(current_position > artwork){
		// 	console.log("hey");
		// 	$("nav").children().first().children().first().next().children().first().css("background-color", "whitesmoke");
		// }

	//**************SMOOTH SCROLL NAVIGATION************
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

