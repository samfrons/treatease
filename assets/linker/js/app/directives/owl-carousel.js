angular.module('treateaseApp').directive('owlcarousel',function($timeout, $rootScope, $modal){
 	return {
		restrict : "A",
		replace  : false,
        link: function(scope, elem, attrs) {
        	console.log('scope, elem, attrs', scope, elem, attrs);
        	console.log('directive owlcarousel');
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
				      beforeMove     : beforeMove

				 
				      // "singleItem:true" is a shortcut for:
				      // items : 1, 
				      // itemsDesktop : false,
				      // itemsDesktopSmall : false,
				      // itemsTablet: false,
				      // itemsMobile : false
			 
			  	});
			}, 1000);  	



			function beforeMove(){
				console.log('beforeMove', scope);
			    $rootScope.slideNumber = this.owl.currentItem // current slide from 0 to N-1

				scope.countResult = function ($scope) {
					console.log('scope.questions[$rootScope.slideNumber]', scope.questions[$rootScope.slideNumber]);
					$scope.quickResults = [];
				    _.each(scope.questions[$rootScope.slideNumber].rules, function(rule, index){
					  	if(rule.left_operand === "q_sum_all") {
					  		$scope.leftOperand = 0;
					  		_.each(scope.questions[$rootScope.slideNumber].sub_questions, function(sub_q, sub_index){
					  			console.log('$scope.leftOperand, sub_q.answer', $scope.leftOperand, sub_q.answer);
					  			$scope.leftOperand = $scope.leftOperand + sub_q.answer
					  			console.log("q_sum_all", $scope.leftOperand);
					  		})
					  	} else {
					  		$scope.leftOperand = +scope.questions[$rootScope.slideNumber].sub_questions[index].answer;
					  	}

						$scope.rightOperand  = +rule.right_operand
						console.log('Parsed?', $scope.leftOperand, $scope.rightOperand);
						if(rule.operator === ">") {
							if($scope.leftOperand > $scope.rightOperand) {
								$scope.quickResults.push(rule.success)
								console.log('$scope.quickResults', $scope.quickResults);
							}
						} else if (rule.operator === "<") {
							if($scope.leftOperand < $scope.rightOperand) {
								$scope.quickResults.push(rule.success)
								console.log('$scope.quickResults', $scope.quickResults);
							}
						} else if ( rule.operator === "==") {
							if($scope.leftOperand == $scope.rightOperand) {
								$scope.quickResults.push(rule.success)
								console.log('$scope.quickResults', $scope.quickResults);
							}
						}
					// if($scope.leftOperand + $scope.operator + $scope.rightOperand){
					// 	console.log('success');
					// } else {
					// 	console.log('false');
					// }
					$rootScope.quickResults = $scope.quickResults;
				  	})
				  	
				}(scope)


				var ModalInstanceCtrl = function ($modalInstance, $scope) { //==================modal ctrl
					console.log('Modal ctrl');


					$scope.ok = function () {
					    $modalInstance.close();
					};
					$scope.cancel = function () {
					    $modalInstance.dismiss('cancel');
					};
				};

			    scope.open = function () {
			    	// $modal.$close();
				    var modalInstance = $modal.open({
				      templateUrl: 'myModalContent.html',
				      controller: ModalInstanceCtrl,
				    });

				    modalInstance.result.then(function () {
				    }, function () {
				      console.log('Modal dismissed at: ' + new Date());
				    });
				};


				if($rootScope.quickResults[0].message){
   					scope.open();
				}

			 }
	    }
	} 
});