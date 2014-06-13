'use strict';

angular.module('treateaseApp')
  .factory('MeetingDetailResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/meeting/:action', {
        action: '@action'
      }, {
        detail: {
          method: 'GET',
          params: { action: 'detail' }
        }
      });
  }]);
