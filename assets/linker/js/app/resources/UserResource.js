'use strict';

angular.module('treateaseApp')
  .factory('UserResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/:action', {
        action: '@action'
      }, {
        register: {
          method: 'POST',
          params: { action: 'register' }
        },
        login: {
          method: 'POST',
          params: { action: 'login' }
        },
        logout: {
          method: 'GET',
          params: { action: 'logout' }
        },
        checkLogin: {
          method: 'GET',
          params: { action: 'checkLogin' }
        },
        forgot: {
          method: 'POST',
          params: {action: 'forgot'}
        },
        recovery: {
          method: 'POST',
          params: {action: 'recovery'}
        }
      });
  }]);
