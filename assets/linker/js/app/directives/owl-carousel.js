angular.module('treateaseApp').directive('owlcarousel',function($timeout){
 	return {
		restrict : "A",
		replace  : false,
        link: function(scope, elem, attrs) {
        	$timeout(function(){
		      	angular.element("#owl-demo").owlCarousel({
	 
				      navigation : true, // Show next and prev buttons
				      slideSpeed : 300,
				      paginationSpeed : 400,
				      singleItem:true
				 
				      // "singleItem:true" is a shortcut for:
				      // items : 1, 
				      // itemsDesktop : false,
				      // itemsDesktopSmall : false,
				      // itemsTablet: false,
				      // itemsMobile : false
			 
			  	});
			});  	
	    }
	} 
});