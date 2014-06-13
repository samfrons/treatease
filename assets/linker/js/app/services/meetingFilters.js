'use strict';

angular.module('treateaseApp')
  .factory('meetingFilters', ['$rootScope', '$filter', 'filterModuleInterface', 'eventService', '$log', '$q', function($rootScope, $filter, filterModuleInterface, eventService, $log, $q) {

    var dayFilter = function(item) {
      return true;
    };
    var fellowshipFilter = function(item) {
      console.log('fellowshipFilter item', item);
      return true;
    };
    var timeFilter = function(item) {
      return true;
    };
    var locationFilter = {
      useGeolocation: true,
      customAddress: ''
    };


    var serviceAPI = {
      setDayFilter: function(newDayFilter) {
        dayFilter = newDayFilter;
        eventService.broadcastRootEvent(eventService.filterChangedEvent);
      },
      setFellowshipFilter: function(newFellowshipFilter) {
        fellowshipFilter = newFellowshipFilter;
        eventService.broadcastRootEvent(eventService.filterChangedEvent);
      },
      setTimeFilter: function(newTimeFilter) {
        timeFilter = newTimeFilter;
        eventService.broadcastRootEvent(eventService.filterChangedEvent);
      },

      setLocationFilter: function(newLocationFilter) {
        // console.log('newLocationFilter', newLocationFilter)
        var deferred = $q.defer();
        filterModuleInterface.processLocationFilter(newLocationFilter)
          .then(function(latLng) {
            $log.debug('setLocationFilter latLng=', latLng);
            locationFilter = newLocationFilter;
            eventService.broadcastRootEvent(eventService.locationFilterChangedEvent);
            deferred.resolve(latLng);
          })
          .catch(function() {
            $log.error('error in meetingFilters.setLocationFilter');
            deferred.reject();
          });
        return deferred.promise;
      },
      getLocationFilter: function() {
        return locationFilter;
      },

      filter: function(unfiltered) {
        var filtered = unfiltered;
        filtered = $filter('filter')(filtered, dayFilter);
        filtered = $filter('filter')(filtered, fellowshipFilter);
        filtered = $filter('filter')(filtered, timeFilter);

//        $log.debug('unfiltered', unfiltered)
//        $log.debug('filtered', filtered)

        return filtered;
        // return: filtered array
      }
    };

    return serviceAPI;
  }]);
