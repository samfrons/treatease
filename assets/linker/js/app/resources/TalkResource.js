'use strict';

angular.module('treateaseApp')
  .factory('TalkResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/:action', {
        action: '@action'
      }, 
      {
        findTalkByUsersId: {
          method: 'POST',
          params: { action: 'findTalkByUsersId' }
        },
        findTalkInfoByTalkId: {
          method: 'POST',
          params: { action: 'findTalkInfoByTalkId' }
        },
        findTalkAllInfoByTalkId: {
          method: 'POST',
          params: { action: 'findTalkAllInfoByTalkId' }
        },
        addMessage: {
          method: 'POST',
          params: { action: 'addMessage' }
        },
        changeIsReadedFlag: {
          method: 'POST',
          params: { action: 'changeIsReadedFlag' }
        }
      });
  }]);
