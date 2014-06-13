'use strict';

angular.module('treateaseApp')
  .controller('BrowserCheckCtrl', ['$scope', '$location', 'browserDetection', function($scope, $location, browserDetection) {
    console.log('BrowserCheckCtrl isMobile=' + browserDetection.isMobile());

    if (browserDetection.isMobile()) {
      //$location.path('/mobile/main');
      $location.path('/main');
    } else {
      $location.path('/main');
    }
  }]);
