'use strict';

angular.module('treateaseApp')
  .factory('GenericApiResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/:action', {
        action: '@action'
      }, {
        mapstyle: {
          method: 'GET',
          params: { action: 'mapstyle' }
        }
      });
  }]);
