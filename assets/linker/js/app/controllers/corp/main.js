'use strict';

angular.module('treateaseApp')
  .controller('MainCtrl', ['$scope', '$location', 'browserDetection', '$rootScope', function($scope, $location, browserDetection, $rootScope) {
    $rootScope.useMobileHeaderFooter = $location.path().slice(0,7) === '/mobile';
    // ===========================================================custom accordion
    $scope.class1 = 'in';
    $scope.class2 = '';
    $scope.class3 = '';
    $scope.class4 = '';
    $scope.changeClass = function(num) {
      console.log('works', num);
      if (num === '1') {
        if($scope.class1 === '') {
          $scope.class1 = 'in';
          $scope.class2 = '';
          $scope.class3 = '';
          $scope.class4 = '';         
        } else {
          $scope.class1 = '';
          $scope.class2 = '';
          $scope.class3 = '';
          $scope.class4 = ''; 
        }

      }if (num === '2') {
          if($scope.class2 === '') {
            $scope.class1 = '';
            $scope.class2 = 'in';
            $scope.class3 = '';
            $scope.class4 = '';         
        } else {
            $scope.class1 = '';
            $scope.class2 = '';
            $scope.class3 = '';
            $scope.class4 = '';
        }
      }if (num === '3') {
          if($scope.class3 === '') {
            $scope.class1 = '';
            $scope.class2 = '';
            $scope.class3 = 'in';
            $scope.class4 = '';         
        } else {
            $scope.class1 = '';
            $scope.class2 = '';
            $scope.class3 = '';
            $scope.class4 = ''; 
        }
      }if (num === '4') {
          if($scope.class4 === '') {
            $scope.class1 = '';
            $scope.class2 = '';
            $scope.class3 = '';
            $scope.class4 = 'in';         
        } else {
            $scope.class1 = '';
            $scope.class2 = '';
            $scope.class3 = '';
            $scope.class4 = ''; 
        }
      }
      
    }   
// ===========================================================custom accordion
  }]);
