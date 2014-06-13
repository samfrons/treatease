'use strict';

angular.module('treateaseApp')
  .directive('uploader', ['$window', function($window){
    return {
      restrict : 'A',
      link: function ($scope, element, attributes) {
        element.bind('change', function (event) {
            var files = event.target.files;
            $scope.$apply(function () {
                for (var i = 0, length = files.length; i < length; i++) {
                    $scope.files.push(files[i]);
                }
            });
        });
      } 
    };
  }]);