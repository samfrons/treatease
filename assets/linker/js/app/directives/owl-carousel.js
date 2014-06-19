angular.module('treateaseApp').directive('owlcarousel',function($timeout, $rootScope, $modal){
 	return {
		restrict : "A",
		replace  : false,
        link: function(scope, elem, attrs) {
        	$timeout(function(){
		      	angular.element("#owl-demo").owlCarousel({
	 
				      navigation      : true, // Show next and prev buttons
				      slideSpeed      : 300,
				      paginationSpeed : 400,
				      singleItem      : true,
				      autoHeight      : true,
				      mouseDrag       : false,
				      touchDrag       : false,
				      pagination      : true,
				      rewindNav       : false,
				      navigationText  : ["back","next"],
				      afterAction     : afterAction

				 
				      // "singleItem:true" is a shortcut for:
				      // items : 1, 
				      // itemsDesktop : false,
				      // itemsDesktopSmall : false,
				      // itemsTablet: false,
				      // itemsMobile : false
			 
			  	});
			}, 1000);  	



			function afterAction(){
			    scope.open = function () {
				    var modalInstance = $modal.open({
				      templateUrl: 'myModalContent.html',
				      controller: ModalInstanceCtrl,
				    });

				    modalInstance.result.then(function () {
				    }, function () {
				      // $log.info('Modal dismissed at: ' + new Date());
				    });
				};
				angular.element('.owl-next').bind('click', function(){
			   		scope.open();
				});
				angular.element('.owl-prev').bind('click', function(){
			   		scope.open();
				});



				var ModalInstanceCtrl = function ($modalInstance, $scope) { //==================modal ctrl
				  $scope.ok = function () {
				    $modalInstance.close();
				  };
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };
				};
			    $rootScope.slideNumber = this.owl.currentItem // current slide from 0 to N-1


			 }
	    }
	} 
});