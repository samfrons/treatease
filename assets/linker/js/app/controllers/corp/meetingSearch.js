'use strict';

angular.module('treateaseApp')
  .controller('MeetingSearchCtrl', ['$scope', function ($scope) {
    $scope.showFilter = true;
    $scope.showMeetingsList = true;
    $scope.showMap = true;

    
    $scope.showMapAlways = function() {
    	// if ($scope.showFilter == false && $scope.showMeetingsList == false) {
    	// 	$scope.showMap = true;
    	// }

    	// if ($scope.showFilter == true || $scope.showMeetingsList == true) {
    	// 	$scope.showMap = false;
    	// }

    	// console.log('$scope.showFilter', $scope.showFilter)
    	// console.log('$scope.showMeetingsList', $scope.showMeetingsList)
    	// console.log('$scope.showMap', $scope.showMap)
    }

     $scope.selected = 0;

    $scope.select= function(item) {
    	if ($scope.selected == 0) {
       		$scope.selected = item; 
    	} else 
		if ($scope.selected == 1 && item == 2) {
		$scope.selected = 2;
		} else 
		if ($scope.selected == 2 && item == 1) {
			$scope.selected = 1;
    	} 
    	else { $scope.selected = 0 }	

       console.log('$scope.selected = ', $scope.selected )
    };

    $scope.itemClass = function(item) {
        return item === $scope.selected ? 'active' : undefined;
    };
  }]);
