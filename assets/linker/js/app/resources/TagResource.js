'use strict';

angular.module('treateaseApp')
  .factory('TagResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/tag/:action', {
        action: '@action'
      }, {
        query: {
          method: 'GET',
          isArray: true,
          cache: true
        },
        findAll: {
          method: 'GET',
          cache: true,
          params: { action: 'findAll' }
        }
      });
  }]);
