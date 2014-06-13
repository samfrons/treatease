'use strict';

angular.module('treateaseApp')
  .factory('CommentResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/comment/:action', {
        action: '@action'
      }, {
        create: {
          method: 'POST',
          params: { action: 'create' }
        }
      });
  }]);
