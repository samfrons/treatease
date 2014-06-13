'use strict';

angular.module('treateaseApp')
  .factory('auth', ['$rootScope', '$resource', '$log', 'UserResource', 'eventService', '$location', function($rootScope, $resource, $log, UserResource, eventService, $location) {





    var accessLevels = routingConfig.accessLevels;
    var userRoles = routingConfig.userRoles;
    var defaultUser = angular.copy(routingConfig.defaultUser);
    var currentUser = angular.copy(defaultUser); // initialize currentUser to default

    var changeUser = function(user) {
//      $log.debug('changing user to ', user, currentUser);
      currentUser = angular.copy(user);
      // $log.debug('changed user to ',currentUser);
      eventService.broadcastRootEvent(eventService.userChangedEvent, currentUser);
    };
//    $log.debug('initializing auth current user to default');
//    changeUser(defaultUser); // start with default

    var serviceApi = {
      authorize: function(accessLevel, role) {
        role = role || currentUser.role;
        if (accessLevel && role) {
          /* jshint bitwise:false */
          return accessLevel.bitMask & role.bitMask;
        } else {
          // $log.error('authService.authorize: bad params. accessLevel,role', accessLevel, role);
//          if (angular.isUndefined(accessLevel)) $log.error('authService.authorize: accessLevel is undefined. role=',role);
//          if (angular.isUndefined(role)) $log.error('authService.authorize: role is undefined. accessLevel=',accessLevel);
          return false;
        }
      },
      isLoggedIn: function(user) {
        user = user || currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      register: function(user, success, error) {
        UserResource.register(user).$promise
          .then(function(response) {
            if (response.status === 11000){
              error(response.error)
            }
            else if (response.status === 51) {
              error(response.error)
            }
            else {
              var newUser = {
                username: response.username,
                role: response.role,
                id: response.id,
                avatarId: response.avatarId
              };
              changeUser(newUser);
              if (success) success(newUser);
            }
          })
          .catch(function(err) {
            // $log.error('bad registration: ', err);
            if (error) error(err);
          });
      },
      login: function(user, success, error) {
        // $log.debug('user=', user)
        UserResource.login(user).$promise
          .then(function(response) {
            if(response.user){
              changeUser(response.user);
              if (success) success(response.user);
            }else{
              if (error) error(response.message);
            }
          })
          .catch(function(err) {
            // $log.error('bad login: ', err);
            if (error) error(err);
          });
      },
      checkLogin: function(success, error) {
        UserResource.checkLogin().$promise
          .then(function(response) {
// console.log('checkLogin auth serv response', response);
            if (response.user) {
              changeUser(response.user);
              console.log('true');
              if (success) success(true, response.user);
            } else {
              console.log('false');
              changeUser(defaultUser);
              if (success) success(false);
            }
          })
          .catch(function(err) {
            $log.error('bad checkLogin: ', err);
            changeUser(defaultUser);
            if (error) error(err);
            
          });
      },
      logout: function(success, error) {
        UserResource.logout().$promise
          .then(function(response) {
            // TODO: check for response.success
            changeUser(defaultUser);
            if (success) success(defaultUser);
          })
          .catch(function(err) {
            // $log.error('bad logout: ', err);
            if (error) error(err);
          });
      },
      forgot: function (recovery, success, error) {
        // console.log('auth forgot recovery', recovery); //return;
        var json = {recovery: recovery}
         UserResource.forgot(JSON.stringify(json)).$promise
          .then(function(response) {
            if (response.message ) {
              $rootScope.recoveryUserId = response.id;
              $location.path('/recovery');
            }
          })
          .catch(function(err) {
            // $log.error('Server\'s error', err);
            if (error) error(err);
          });
      },

      recovery: function (recovery, success, error) {
        $rootScope.passChanged = false
        recovery.id = $rootScope.recoveryUserId
        UserResource.recovery(JSON.stringify(recovery)).$promise
          .then(function(response) {
            // console.log('!response response', response.message);
            // console.log('$rootScope.recoveryResponse', $rootScope.recoveryResponse);
            if (response.message ==='Password has been updated.' ) {
              $rootScope.passChanged = true
              $location.path('#login');
            }
            else {
              $rootScope.recoveryResponse = response.message
              
            }




            //TODO: response from API
          })
          .catch(function(err) {
            // $log.error('Server\'s error', err);
            if (error) error(err);
          });
      },

      getAccessLevels : function() { return accessLevels; },
      getUserRoles    : function() { return userRoles; },
      getUser         : function() { return angular.copy(currentUser); },
      accessLevels    : function() { return accessLevels; },
      userRoles       : function() { return userRoles; },
      user            : function() { return angular.copy(currentUser); },

    };
    return serviceApi;
  }]);
