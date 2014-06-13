'use strict';

angular.module('treateaseApp')
  .factory('MeetingResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      apiRoot + 'api/meeting/:meetingId/:action/:mappingId', {
        action: '@action',
        meetingId: '@meetingId',
        mappingId: '@mappingId'
      }, {
//        detail: {
//          method: 'GET',
//          params: { action: 'detail' }
//        },
        memberAdd: {
          method: 'POST',
          params: {
            action: 'membership'
          }
        },
        memberDrop: {
          method: 'DELETE',
          params: {
            action: 'membership'
          }
        },
        favoriteAdd: {
          method: 'POST',
          params: {
            action: 'favorite'
          }
        },
        favoriteDrop: {
          method: 'DELETE',
          params: {
            action: 'favorite'
          }
        },
        commentAdd: {
          method: 'POST',
          params: {
            action: 'comment'
          }
        },
//        commentDrop: {
//          method: 'DELETE',
//          params: {
//            action: 'comment'
//          }
//        },
        tagAdd: {
          method: 'POST',
          params: {
            action: 'tag'
            // note: mappingId is tagid
          }
        },
        tagDrop: {
          method: 'DELETE',
          params: {
            action: 'tag'
            // note: mappingId is tagid
          }
        }
      });
  }]);
