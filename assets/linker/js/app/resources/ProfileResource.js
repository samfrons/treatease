'use strict';

angular.module('treateaseApp')
  .factory('ProfileResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/:action/:username', {
        action: '@action',
        username: '@username'
      }, {
        profile: {
          method: 'GET',
          params: { action: 'profile' }
        },
        getUserInfoForMessengerById: {
          method: 'POST',
          params: { action: 'getUserInfoForMessengerById', username: '' }
        },
        pushTalkIdToUserProfile: {
          method: 'POST',
          params: { action: 'pushTalkIdToUserProfile', username: ''}
        }

      });
  }]);
