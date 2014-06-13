'use strict';

angular.module('treateaseApp')
  .factory('meetingServer', ['GeoResource', 'MeetingDetailResource', 'MeetingResource', '$log', '$q', 'auth', function(GeoResource, MeetingDetailResource, MeetingResource, $log, $q, auth) {

    var convertLatLngBoundsToParams = function(bb, lat, lng) {
      return {
        south: bb.getSouthWest().lat(),
        west: bb.getSouthWest().lng(),
        north: bb.getNorthEast().lat(),
        east: bb.getNorthEast().lng(),
        lat: lat,
        lng: lng
      };
    };

    // Public API here
    var serviceAPI = {
      getMeetingsFromServer: function(bb, lat, lng) {
        // TODO: HIGH: this is making multiple calls to the server, but working for now
        // Retrieves meeting objects from server based on current filters
        // bb is the bounding box of type google.maps.LatLngBounds
//        $log.debug('meetingServer::getMeetingsFromServer - '+ callingFuncName); // optional arg used for logging to determine where call originated
        var meetings = GeoResource.geoWithin(convertLatLngBoundsToParams(bb, lat, lng));
        return meetings.$promise;
      },

      getMeetingById: function(meetingId) {
        var deferred = $q.defer();
        MeetingDetailResource.detail({ meetingId: meetingId }).$promise
          .then(function(response) {
            deferred.resolve(response.meeting);
          })
          .catch(function(err) {
            $log.error('meetingServer::getMeetingById ', err);
            deferred.reject(err);
          });

        return deferred.promise;
      },







      // new stuff
      membership: {
        add: function(meetingId) {
          var deferred = $q.defer();
          MeetingResource.memberAdd({
            meetingId: meetingId
          }).$promise
            .then(function(response) {
              if (!response.success) {
                deferred.reject('api call failed');
              } else {
                deferred.resolve(response);
                console.log('response', response);
              }
            })
            .catch(function(err) {
              $log.error('meetingServer::membership.add ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        },
        drop: function(meetingId) {
          var deferred = $q.defer();
          MeetingResource.memberDrop({
            meetingId: meetingId
          }).$promise
            .then(function(response) {
              $log.debug('meeting drop then', response)
              // TODO: do something
              deferred.resolve(response.success);
            })
            .catch(function(err) {
              $log.error('meetingServer::membership.drop ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        }
      },
      favorite: {
        add: function(meetingId) {
          var deferred = $q.defer();
          MeetingResource.favoriteAdd({
            meetingId: meetingId
          }).$promise
            .then(function(response) {
              // TODO: do something
              deferred.resolve(response.mapping);
            })
            .catch(function(err) {
              $log.error('meetingServer::favorite.add ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        },
        drop: function(meetingId) {
          var deferred = $q.defer();
          MeetingResource.favoriteDrop({
            meetingId: meetingId
          }).$promise
            .then(function(response) {
              $log.debug('meeting drop then', response)
              // TODO: do something
              deferred.resolve(response.success);
            })
            .catch(function(err) {
              $log.error('meetingServer::favorite.drop ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        }
      },
      comment: {
        add: function(meetingId, comment) {
          var deferred = $q.defer();
          MeetingResource.commentAdd({
            meetingId: meetingId,
            comment: comment
          }).$promise
            .then(function(response) {
              if (response.success) {
                deferred.resolve(response);
              } else {
                deferred.reject('api failure when posting comment');
              }
            })
            .catch(function(err) {
              $log.error('meetingServer::comment.add ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        },
//        drop: function(meetingId) {
//          var deferred = $q.defer();
//          MeetingResource.commentDrop({
//            meetingId: meetingId
//          }).$promise
//            .then(function(response) {
//              $log.debug('meeting drop then', response)
//              // TODO: do something
//              deferred.resolve(response.success);
//            })
//            .catch(function(err) {
//              $log.error('meetingServer::comment.drop ', err);
//              deferred.reject(err);
//            });
//          return deferred.promise;
//        }
      },
      tag: {
        add: function(meetingId, tagId) {
          var deferred = $q.defer();
          MeetingResource.tagAdd({
            meetingId: meetingId,
            mappingId: tagId
          }).$promise
            .then(function(response) {
              deferred.resolve(response);
            })
            .catch(function(err) {
              $log.error('meetingServer::tag.add ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        },
        drop: function(meetingId, tagId) {
          var deferred = $q.defer();
          MeetingResource.tagDrop({
            meetingId: meetingId,
            mappingId: tagId
          }).$promise
            .then(function(response) {
              $log.debug('meeting drop then', response)
              // TODO: do something
              deferred.resolve(response.success);
            })
            .catch(function(err) {
              $log.error('meetingServer::tag.drop ', err);
              deferred.reject(err);
            });
          return deferred.promise;
        }
      }
    };
    return serviceAPI;
  }]);
