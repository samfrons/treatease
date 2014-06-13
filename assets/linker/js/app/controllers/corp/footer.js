'use strict';

angular.module('treateaseApp')
  .controller('FooterCtrl', ['$scope', '$rootScope',  function($scope, $rootScope) {
  	// 
  	console.log('$rootScope.location = ', $rootScope.location)
  	if($rootScope.location.$$path === '/meetings'){
  		$scope.hideFooterOnTheMap = true
  	}else{
  		$scope.hideFooterOnTheMap = false
  	}


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
