'use strict';

angular.module('treateaseApp')
  .factory('meetingCache', ['eventService', '$http', '$rootScope', '$filter', 'timeInterval', '$timeout', 'meetingServer', 'distanceMath', 'filterModuleInterface', 'meetingFilters', '$q', '$log', function(eventService, $http, $rootScope, $filter, timeInterval, $timeout, meetingServer, distanceMath, filterModuleInterface, meetingFilters, $q, $log) {

    var searchBounds; //new google.maps.LatLngBounds(new google.maps.LatLng(0,0), new google.maps.LatLng(0,0)); // google.maps.LatLngBounds
    var limitTo;

    var isDirty = true; // flag used to determine whether server needs to be called for new data
    var isWaitingForData = false;

    var cachedMeetings = []; // latest list of meetings retrieved from server




    var calculateSearchBounds = function(mapBounds) {
      // Increase the size of the search boundary from a given map bounds
      // mapBounds is type google.maps.LatLngBounds
      // returns a new google.maps.LatLngBounds object
      return new google.maps.LatLngBounds(mapBounds.getSouthWest(), mapBounds.getNorthEast());
    };





    // isMeetingStartingSoon(meeting)
    // returns true if meeting is starting soon
    var isMeetingStartingSoon = function(meeting) {
      var threshold = 4; // max hours from now that a meeting is considered "soon"
      var now = new Date();
      var t = meeting.timeObj;

      var isSoon = now.getUTCDay() === t.getUTCDay() &&
        t.getUTCHours() >= now.getUTCHours() &&
        t.getUTCHours() <= now.getUTCHours()+threshold;

      return isSoon;
    };


    /**
     * Extends the meeting with extra fields for date/time, etc.
     * @param meeting will be modified
     * @returns {*}
     */
    var postprocessMeeting = function(meeting) {
//        var dt = new Date(1,0,dayNumber,0,0,0,0); // we dont care about year/month, but let's set day of week
      // TODO: use moment.js
      var dt = new Date();
      dt.setFullYear(1,0,meeting.dayNumber); // we dont care about year/month, but let's set day of week
      dt.setHours(meeting.time.split(':')[0], meeting.time.split(':')[1], 0);
      angular.extend(meeting, {
        timeObj: dt,
        timeAsNumber: parseInt(meeting.time.split(':')[0] + meeting.time.split(':')[1], 10)
      });


      // add isSoon info
      angular.extend(meeting, {
        isSoon: isMeetingStartingSoon(meeting)
      });

      // google maps directions api
      angular.extend(meeting.location, {
        google: {
          q: meeting.address.replace(' ','+') + ',' + meeting.city.replace(' ','+') + ',' + meeting.state.replace(' ','+')
        }
      });

      // lat/lng
      angular.extend(meeting.location, {
        latitude: meeting.location.coordinates[1],
        longitude: meeting.location.coordinates[0],
        latLng: function() {
          return new google.maps.LatLng(meeting.location.latitude, meeting.location.longitude);
        }
      });

      // distance pretty display
      if (angular.isNumber(meeting.distance)) {
        var distanceDisplay = $filter('number')(meeting.distance, 1);
        if (distanceDisplay==='1.0') {
          distanceDisplay += ' ' + meeting.distanceUnit.singular.name;
        } else {
          distanceDisplay += ' ' + meeting.distanceUnit.plural.name;
        }
        angular.extend(meeting, {
          distanceDisplay: distanceDisplay
        });
      }

      return meeting;
    };

    var postprocessMeetings = function(meetings) {
      var newMeetings = [];
// console.log('limitTo', limitTo);
      // limitTo filter
      meetings = angular.isNumber(limitTo) ? $filter('limitTo')(meetings,limitTo) : meetings;
      // postprocess each meeting
      angular.forEach(meetings, function(meeting) {
        newMeetings.push(postprocessMeeting(meeting));
      });

      cachedMeetings = newMeetings;

      isDirty = false;
//      $log.debug('*** got '+ cachedMeetings.length + ' meetings (' + serviceAPI.getMeetingsFromCache().length + ' filtered) ***', cachedMeetings);
      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
    };




    // register filter change events
    eventService.registerRootEventHandler(eventService.filterChangedEvent, function() {
      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
    });
//    eventService.registerRootEventHandler(eventService.locationFilterChangedEvent, function() {
//      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
//    });





    // Public API
    var serviceAPI = {
      setMapBounds: function(mapBounds) {
        // sets the searchBounds based on the input map bounds
        // bb is the bounding box of type google.maps.LatLngBounds
        var wasDefined = angular.isDefined(searchBounds);
        searchBounds = calculateSearchBounds(mapBounds);
//        $log.debug('meetingcache setmapbounds', isDirty)
        isDirty = true;
//        if (!wasDefined && angular.isDefined(mapBounds)) {
//          // send refresh event on first time setting searchBounds object
//          $log.debug('first time')
//          eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent);
//        } else {
//          eventService.broadcastRootEvent(eventService.dataCacheMapBoundsChangedEvent);
//        }
        eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent);

      },
//      setCurrentLocation: function(latLng) {
//        // sets the current location
//        // latLng is of type google.maps.LatLng
//        currentLocation = new google.maps.LatLng(latLng.lat(), latLng.lng());
//        isDirty = true;
//      },
      setLimitTo: function(limit) {
        limitTo = limit;
      },
      getMeetingsFromCache: function() {
        // bb is the bounding box of type google.maps.LatLngBounds
//        $log.debug('>>> meetingCache.getMeetingsFromCache - '+ callingFuncName + ' and isDirty='+isDirty+' and isDefined(searchBounds)='+angular.isDefined(searchBounds)); // optional arg used for logging to determine where call originated

        if (isDirty && angular.isDefined(searchBounds) && !isWaitingForData) {
          isWaitingForData = true;
          // console.log('searchBounds', searchBounds);
          meetingServer.getMeetingsFromServer(searchBounds, filterModuleInterface.getCurrentLocationLatLng().lat(), filterModuleInterface.getCurrentLocationLatLng().lng())
            .then(function(response) {
              var meetings = response.data;
              postprocessMeetings(meetings);
              isWaitingForData = false;
            })
            .catch(function(reason) {
              isWaitingForData = false;
            });
        }

        // TODO: need promises here.  for now, returns the old cachedMeetings and use broadcast to make change
        return meetingFilters.filter(cachedMeetings);
        // return: array of meeting objects from server
      },

      getMeetingById: function(meetingId) {
        var deferred = $q.defer();
        // currently does not use a cache
        meetingServer.getMeetingById(meetingId)
          .then(function(meeting) {
            deferred.resolve(postprocessMeeting(meeting));
//            $log.debug('pre: ', meeting);
//            var processedMeeting = postprocessMeeting(meeting);
//            deferred.resolve(processedMeeting);
//            $log.debug('post: ', processedMeeting);
          });
        // TODO: .catch clause
        return deferred.promise;
      },

      processMeeting: function(meeting) {
        postprocessMeeting(meeting);
      },

      getCurrentLocationLatLng: function() {
        return filterModuleInterface.getCurrentLocationLatLng();
      }
    };
    return serviceAPI;
  }]);
