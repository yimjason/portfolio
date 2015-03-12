$( document ).ready(function() {
  
	//**************SMOOTH SCROLL NAVIGATION************
	$(".nav_link").click(function(event){
		event.preventDefault();
		var dest=$(this.hash).offset().top-38; 
		$('html,body').animate({scrollTop:dest}, 1000,'swing');
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

