'use strict';

angular.module('treateaseApp')
  .controller('RegisterCtrl', ['$scope', '$location', '$http', 'auth', '$log', '$rootScope', function ($scope, $location, $http, auth, $log, $rootScope) {

    $scope.user = {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      avatarId: 'default'
    };

    // TODO: get this list from db
    $scope.avatars = [
      'default',
      'bender',
      'barney',
      'tom-waits',
      'iron-man',
      'antique',
      'buzz-lightyear',
      'princess-leia'
    ];

    $scope.doRegister = function(){

      // TODO: -jquery
     angular.element(document.querySelector('#errormsg')).addClass('hide');
      if($scope.user.username === '' || $scope.user.password === '' || $scope.user.passwordConfirmation === '' || $scope.user.email === ''){
        $rootScope.error = "fill out all required fields"
        angular.element(document.querySelector('#errormsg')).removeClass('hide');
        angular.element(document.querySelector('#errormsg')).addClass('show');
        return;
      }
      if ($scope.user.password !== $scope.user.passwordConfirmation) {
        $rootScope.error = "password doesn't match"
        angular.element(document.querySelector('#errormsg')).removeClass('hide');
        angular.element(document.querySelector('#errormsg')).addClass('show');
        return;
      }
      if ($scope.user.email === undefined) {
        $rootScope.error = "incorrect or undefined email"
        angular.element(document.querySelector('#errormsg')).removeClass('hide');
        angular.element(document.querySelector('#errormsg')).addClass('show');
        return;
      }


      $scope.user.role = auth.userRoles().user;
      auth.register(
        $scope.user,
        function() {
          $log.debug('RegisterCtrl: successfully registered and logged in', auth.user());
          $location.path('/');
        },
        function(err) {
          $log.error('RegisterCtrl: failed registration', err);
          $rootScope.error = err;
          angular.element(document.querySelector('#errormsg')).removeClass('hide');
          angular.element(document.querySelector('#errormsg')).addClass('show');
        });
    };

  }]);