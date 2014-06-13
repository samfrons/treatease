'use strict';

angular.module('treateaseApp')
  .factory('GeoResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/geo/:action', {
        action: '@action'
      }, {
        geoWithin: {
          method: 'GET',
          params: { action: 'geoWithin' }
        }
      });
  }]);
