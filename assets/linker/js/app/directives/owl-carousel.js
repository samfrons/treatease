angular.module('treateaseApp')
.config(function ($httpProvider) {        
	$httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.directive('owlcarousel',function($timeout, $rootScope, $modal, $http){
 	return {
		restrict : "A",
		replace  : false,
        link: function(scope, elem, attrs) {
        	console.log('scope, elem, attrs', scope, elem, attrs);
        	console.log('directive owlcarousel');
		    $rootScope.quickResults = [];
        	$timeout(function(){
		      	angular.element("#owl-demo").owlCarousel({
				      navigation      : true, // Show next and prev buttons
				      slideSpeed      : 300,
				      paginationSpeed : 400,
				      singleItem      : true,
				      autoHeight      : true,
				      mouseDrag       : false,
				      touchDrag       : false,
				      pagination      : false,
				      rewindNav       : false,
				      navigationText  : ["back", "next"],
				      beforeMove      : beforeMove,		
				      // afterMove       : afterMove	 
			  	});



			  	angular.element('.owl-next').bind('click', function(){
			  		console.log('obj');
			    	scope.nextButtonClicked = true;
			  	})

		    //   	var nextButton = angular.element(elem[0].lastChild.lastChild.firstChild)
	    	// 	nextButton.bind('click', function() {
			  	// });

			}, 1000);

        	// function afterMove() {
        	// 	$timeout(function() {

        	// 	scope.nextButtonClicked = false
        	// 	}, 2500)
        	// }

			function beforeMove(e) {
				console.log('beforeMove', e);
				$rootScope.resultsCanBeLoaded = true;
			    $rootScope.slideNumber = this.owl.currentItem // current slide from 0 to N-1
			    if($rootScope.quickResults.length === 0) {
					scope.countResult = function ($scope) {
						// console.log('[$rootScope.slideNumber]', $rootScope.slideNumber);
						if(scope.questions[$rootScope.slideNumber]) {
							$scope.quickResults = [];
						    _.each(scope.questions[$rootScope.slideNumber].rules, function(rule, index){
							  	if(rule.left_operand === "q_sum_all") {
							  		$scope.leftOperand = 0;
							  		_.each(scope.questions[$rootScope.slideNumber].sub_questions, function(sub_q, sub_index){
							  			// console.log('$scope.leftOperand, sub_q.answer', $scope.leftOperand, sub_q.answer);
							  			$scope.leftOperand = $scope.leftOperand + sub_q.answer
							  			// console.log("q_sum_all", $scope.leftOperand);
							  		})
							  	} else {
							  		$scope.leftOperand = +scope.questions[$rootScope.slideNumber].sub_questions[index].answer;
							  	}

								$scope.rightOperand  = +rule.right_operand
								// console.log('Parsed?', $scope.leftOperand, $scope.rightOperand);
								if(rule.operator === ">") {
									if($scope.leftOperand > $scope.rightOperand) {
										if(rule.success.message) $scope.quickResults.push(rule.success)
										// console.log('$scope.quickResults', $scope.quickResults);
									}
								} else if (rule.operator === "<") {
									if($scope.leftOperand < $scope.rightOperand) {
										if(rule.success.message) $scope.quickResults.push(rule.success)
										// console.log('$scope.quickResults', $scope.quickResults);
									}
								} else if ( rule.operator === "==") {
									if($scope.leftOperand == $scope.rightOperand) {
										if(rule.success.message) $scope.quickResults.push(rule.success)
										// console.log('$scope.quickResults', $scope.quickResults);
									}
								}
								$rootScope.quickResults = $scope.quickResults;
						  	})
						}
					}(scope)
			    } else {
			    	$rootScope.quickResults = [];
			    }

//=========================================================== if last question slide then prepare and send data to API
			    // if($rootScope.slideNumber === (scope.questions.length-1) ) {
			    	scope.userAnswers = [];
			    	_.each(scope.questions, function(question, q_index){
			    		_.each(question.sub_questions, function(sub_q, sq_index) {
			    			scope.userAnswers.push(
			    				{
			    					"sub_question_id": sub_q.sub_question_id,
									"option_id"      : sub_q.answerId
								}
							)
			    			if(scope.userAnswers.length === scope.questions[q_index].sub_questions.length) {
				    			scope.submitAnswer = {
						          "key": scope.apiKey,
						          "token_id": scope.token_id,
						          "question_id": q_index + 1,
						          "answers": scope.userAnswers
  						        };
  						        scope.userAnswers = [];
  						        console.log('scope.submitAnswer', scope.submitAnswer);
					        	submit_answer(scope.submitAnswer)
			    			}
			    		})
			    	})
				// }


				function submit_answer(request) {
			     //  $http.post('http://www.drugabuse.gov/qm/answer?key=' + scope.submitAnswer.key + '&token_id=' + scope.submitAnswer.token_id + '&question_id=' + scope.submitAnswer.question_id + '&answers=' + encodeURIComponent(JSON.stringify(scope.submitAnswer.answers)) + '&callback=JSON_CALLBACK')
				    // $http({
				    //   	url: 'http://www.drugabuse.gov/qm/answer',
				    //   	method: 'POST',
				    //   	withCredentials: true,
				    //   	crossDomain : true,
			     //  		data: request,
			     //  		headers: {
			     //  			'Content-Type': 'application/json'
			     //  		}
			     //  	}).success(function (response) {
				    //       console.log('response', response);
				    // })
			    }
//=========================================================== if last question slide then prepare and send data to API



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
				    var modalInstance = $modal.open({
				      templateUrl: 'myModalContent.html',
				      controller: ModalInstanceCtrl,
				    });

				    modalInstance.result.then(function () {
				    }, function () {
				      	console.log('Modal dismissed at: ' + new Date());
				      	$rootScope.quickResults = []
				    });
				};


				if( $rootScope.quickResults.length > 0){
   					scope.open();
   					// scope.nextButtonClicked = true;
				}
			 }
	    }
	} 
});