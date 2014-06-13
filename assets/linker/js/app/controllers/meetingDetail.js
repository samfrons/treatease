'use strict';

angular.module('treateaseApp')
  .controller('MeetingDetailCtrl', [
    '$scope', '$rootScope', '$routeParams', 'ProfileResource', 'eventService', 'meetingCache', 
    '$log', '$resource', 'auth', 'TagResource', 'CommentResource', 'meetingServer', 
    '$q', '_', 'GenericApiResource', 'userQueryForRootScope', 'mapStyleStorage',
    function ($scope, $rootScope, $routeParams, ProfileResource, eventService, meetingCache, $log, $resource, 
    auth, Tag, Comment, meetingServer, $q, _, GenericApiResource, userQueryForRootScope, mapStyleStorage) {
  //=================================================== 
    // userQueryForRootScope.query().then(function(response){
    //   // console.log('response from factory in controller', response);
    //   $rootScope.currentUser = response[0];
  //===============================================
    
    // $scope.getUserByName = function(name) {
    


    //   ProfileResource.profile({ username: $rootScope.currentUser.username }).$promise
    //     .then(function(response) {
    //       $scope.currentUser = response.profile.user
    //       // console.log('$scope.currentUser', $scope.currentUser)
    //     })
    //     .catch(function(errResponse) {
    //       // TODO: error handling
    //     });
    // }();

    // page defaults
    $scope.membership = {
      maxMembersToShow: 5,
      numVisibleMembers: 0,
      numOverflowMembers: 0,
      showAll: false,
      toggleShowAll: function() {
        $scope.membership.showAllMembers(!$scope.membership.showAll);
      },
      showAllMembers: function(showAll) {
        $scope.membership.showAll = showAll;
        $scope.membership.maxMembersToShow = showAll ? 9999 : 5;
        $scope.membership.numVisibleMembers = $scope.meeting.users.membership.users.length > $scope.membership.maxMembersToShow ? $scope.membership.maxMembersToShow : $scope.meeting.users.membership.users.length;
        $scope.membership.numOverflowMembers = $scope.meeting.users.membership.users.length > $scope.membership.maxMembersToShow ? $scope.meeting.users.membership.users.length - $scope.membership.maxMembersToShow : 0;
      }
    };

    // $scope.sendMessage = function () {
    //   console.log('$scope.chatMessage', $scope.chatMessage);
    //   socket.post('/api/chat', {
    //     message : $scope.chatMessage
    //   })
    // };

    $scope.tags = {
      activeTags: [],
      inactiveTags: []
    };

    $scope.mapOptions = {
      center     : new google.maps.LatLng(35.784, -78.670),
      zoom       : 15,
      mapTypeId  : google.maps.MapTypeId.ROADMAP,
      styles     : mapStyleStorage.mapStyleFunc()

    };
    $scope.setMapCenter = function() {
      if (angular.isDefined($scope.meeting)) {
        $scope.map.setCenter($scope.meeting.location.latLng());
      }
    };


    // load all tags
    $scope.tagList = Tag.findAll();


    var setMeeting = function(meeting) {
      $log.debug('setting new meeting data', meeting);
      $scope.meeting = meeting;

      // console.log('meeting', meeting)

      // set page variables
      $scope.membership.showAllMembers(false);

      // get all tags
      $scope.tagList.$promise.then(function(response) {
        if (response.success) {
          var activeTags = [];
          var inactiveTags = [];
          angular.forEach(response.tags, function(value) {
            if ($scope.meeting.users.tag[value.tagId].count > 0) {
              activeTags.push(angular.extend(value, $scope.meeting.users.tag[value.tagId]));
            } else {
              inactiveTags.push(angular.extend(value, $scope.meeting.users.tag[value.tagId]));
            }
          });
          $scope.tags.activeTags = activeTags;
          $scope.tags.inactiveTags = inactiveTags;
        }
      });

      // console.log('map', $scope.map)

      $scope.$watch('map', function() {
        if (angular.isDefined($scope.map)) {
          $log.debug('map ready');

          var marker = new google.maps.Marker({
            map: $scope.map,
            position: meeting.location.latLng(),
            icon: {
              url: 'images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.isSoon?'-soon':'') + '.png'
            },
            shadow: {
              url: 'images/' + meeting.fellowship.abbrevName + 'pin-shadow.png'
            }
          });
          $scope.meeting.marker = marker;
          $scope.setMapCenter();

          // var mapStyle = mapStyleStorage.mapStyleFunc()
          // $scope.map.setOptions({ styles: mapStyle });
        }
      });

      // console.log('$scope.meeting', $scope.meeting)




      // google map
      // $scope.mapImgSrc = 'http://maps.googleapis.com/maps/api/staticmap' +
      //   '?center=' + $scope.meeting.location.latLng().toUrlValue() +
      //   '&zoom=15' +
      //   '&size=' + 800 + 'x' + 350 +
      //   '&markers=' + $scope.meeting.location.latLng().toUrlValue() +
      //   '&sensor=false';
    };


    if (!angular.isDefined($scope.meeting) && $routeParams.meetingId) {
//      $log.debug('MeetingDetailCtrl $routeParams: ' + $routeParams.meetingId, $routeParams);
      meetingCache.getMeetingById($routeParams.meetingId)
        .then(function(value) {
          setMeeting(value);
        });
    } else {
//      $log.debug('MeetingDetailCtrl meeting=', $scope.meeting);
    }


    $scope.addTag = function(tag) {
      $log.debug('attempting to addTag=' + tag.tagId)
      meetingServer.tag.add($scope.meeting.meetingId, tag.tagId)
        .then(function(value) {
          $scope.meeting.users.tag[tag.tagId].count += 1;
          $scope.meeting.users.tag[tag.tagId].isCurrentUser = true;
          _.extend(_.find($scope.tags.activeTags, { tagId: tag.tagId }), $scope.meeting.users.tag[tag.tagId]);
          _.extend(_.find($scope.tags.inactiveTags, { tagId: tag.tagId }), $scope.meeting.users.tag[tag.tagId]);
          if ($scope.meeting.users.tag[tag.tagId].count === 1) {
            // user made first tag
            $scope.tags.activeTags.push(_.find($scope.tags.inactiveTags, { tagId: tag.tagId }));
            _.remove($scope.tags.inactiveTags, { tagId: tag.tagId });
          }
        })
        .catch(function(err) {
          $log.error('failed to add tag=' + tag.tagId, err);
        });
    };

    $scope.deleteTag = function(tag) {
      $log.debug('attempting to deleteTag=' + tag.tagId);
      meetingServer.tag.drop($scope.meeting.meetingId, tag.tagId)
        .then(function(success) {
          if (success) {
            $scope.meeting.users.tag[tag.tagId].count -= 1;
            $scope.meeting.users.tag[tag.tagId].isCurrentUser = false;
            _.extend(_.find($scope.tags.activeTags, { tagId: tag.tagId }), $scope.meeting.users.tag[tag.tagId]);
            _.extend(_.find($scope.tags.inactiveTags, { tagId: tag.tagId }), $scope.meeting.users.tag[tag.tagId]);
            if ($scope.meeting.users.tag[tag.tagId].count <= 0) {
              // user deleted last tag
              $scope.tags.inactiveTags.push(_.find($scope.tags.activeTags, { tagId: tag.tagId }));
              _.remove($scope.tags.activeTags, { tagId: tag.tagId });
            }
          } else {
            $log.error('failed to drop tag=' + tag.tagId);
          }
        })
        .catch(function(err) {
          $log.error('failed to drop tag=' + tag.tagId, err);
        });
    };

    $scope.joinMeeting = function() {
      $log.debug('attempting to joinMeeting')
      meetingServer.membership.add($scope.meeting.meetingId)
        .then(function(response) {
          $scope.meeting.users.membership.count += 1;
          $scope.meeting.users.membership.isCurrentUser = true;
          $scope.meeting.users.membership.users.push(response.user);
        })
        .catch(function(err) {
          $log.error('failed to join meeting', err);
        });
    };

    $scope.unjoinMeeting = function() {
      $log.debug('attempting to unjoinMeeting');
      meetingServer.membership.drop($scope.meeting.meetingId)
        .then(function(success) {
          if (success) {
            $scope.meeting.users.membership.count -= 1;
            $scope.meeting.users.membership.isCurrentUser = false;
            _.remove($scope.meeting.users.membership.users, { username: $rootScope.currentUser.username });
          } else {
            $log.error('failed to unjoin meeting');
          }
        })
        .catch(function(err) {
          $log.error('failed to unjoin meeting', err);
        });
    };

    $scope.toggleFavorite = function() {
      var wasFavorited = !!$scope.meeting.users.favorite.isCurrentUser; // copy current favorite status
      $log.debug('attempting to toggle favorite. currently set to '+wasFavorited);
      var promise = !wasFavorited ? meetingServer.favorite.add($scope.meeting.meetingId) : meetingServer.favorite.drop($scope.meeting.meetingId);

      promise
        .then(function(value) {
          if (wasFavorited && value===false) {
            $log.error('failed to unfavorite meeting');
          } else {
            $scope.meeting.users.favorite.isCurrentUser = !wasFavorited; // toggle
            $scope.meeting.users.favorite.count += wasFavorited ? -1 : 1;
            $log.debug('successfully toggled favorite')
          }
        })
        .catch(function(err) {
          $log.error('failed to unfavorite meeting', err);
        });
    };

    $scope.postComment = function() {
      // TODO: use function param instead of scope var
      $log.debug('attempting to postComment', $scope.newComment)

      meetingServer.comment.add($scope.meeting.meetingId, $scope.newComment)
        .then(function(response) {
          $scope.meeting.users.comment.push({
            comment: response.mapping.comment,
            user: response.user,
            timestamp: response.mapping.updatedAt
          });
          $scope.newComment = ''; // clear out comment input
        })
        .catch(function(err) {
          $log.error('failed to post comment', err);
        });
    };
  // });  
}]);
//
//  .directive('staticMap', [function() {
//    return {
//      template: '<img ng-src="{{ mapUrl }}"></img>',
//      link: function postLink(scope, element, attrs) {
//
//      }
//    };
//  }]);
