'use strict';

angular.module('treateaseApp')
  .directive('accessLevel', ['auth', '$log', '$rootScope', function (auth, $log, $rootScope) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var prevDisp = element.css('display');
        var userRole;
        var accessLevel;

        $rootScope.$watch('currentUser', function(user) {
          if(user.role) {
            userRole = user.role;
          }
          updateCSS();
        }, true);

        attrs.$observe('accessLevel', function(al) {
          if(al) {
            accessLevel = $scope.$eval(al);
          }
          updateCSS();
        });

        function updateCSS() {
//          $log.debug('DIRECTIVE start:  ', userRole && accessLevel, userRole, accessLevel, $scope.user)
//          $log.debug('DIRECTIVE:  ', userRole)
//          $log.debug('DIRECTIVE:  ', accessLevel)
//          $log.debug('DIRECTIVE:  ', auth.user())
//          $log.debug('DIRECTIVE end:  ', $scope.user)
          if(userRole && accessLevel) {
            if(!auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none');
            } else {
              element.css('display', prevDisp);
            }
          }
        }
      }
    };
  }]);