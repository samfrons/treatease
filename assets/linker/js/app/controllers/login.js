'use strict';

angular.module('treateaseApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'auth', '$log', function ($scope, $rootScope, $location, auth, $log) {
    $rootScope.passChanged = false;

    $scope.user = {
      username: '',
      password: '',
      recoveryPassEmail: '',
      newPassword: '',
      newPasswordConfirm: '',
      forgotToken: ''
    };
    $scope.focusPassword = function(){
      angular.element(document.querySelector('#password'))[0].focus();
    };
    $scope.doLogin = function() {

      // TODO: -jquery
      angular.element(document.querySelector('#errormsg')).addClass('hide');
      if($scope.user.username === '' || $scope.user.password === ''){
        angular.element(document.querySelector('#errormsg')).removeClass('hide');
        angular.element(document.querySelector('#errormsg')).addClass('show');
        return;
      }

      auth.login(
        $scope.user,
        function() {
          $log.debug('LoginCtrl: successfully logged in', auth.user());
          $location.path('/meetings');
        },
        function(err) {
          $log.error('LoginCtrl: failed to login', err);
          $rootScope.error = 'Failed to login: ' + err;
          if($rootScope.error){
            angular.element(document.querySelector('#errormsg')).html($rootScope.error);
            angular.element(document.querySelector('#errormsg')).removeClass('hide');
            angular.element(document.querySelector('#errormsg')).addClass('show');
            return;
          }
        });
    };
    $scope.forgot = function() {

      console.log('=!=!=!=forgot USER=!=!=!=!=', $scope.user)
      auth.forgot($scope.user.recoveryPassEmail)
    }; 

    $scope.recovery = function() {
      delete $scope.user.username;
      delete $scope.user.password;
      console.log('=!=!=!=recovery USER=!=!=!=!=zzz', $scope.user)

      angular.element(document.querySelector('#errormsg')).addClass('hide');
      if($scope.user.newPassword === '' || $scope.user.newPasswordConfirm === '' || $scope.user.forgotToken === ''){
        $scope.clientSideValidateErrorMessage = 'Fields are empty';      
      } else if ($scope.user.newPassword !==  $scope.user.newPasswordConfirm) {
        $scope.clientSideValidateErrorMessage = 'Passwords are missmatch';
      }

      auth.recovery($scope.user)
    } 
  }]);