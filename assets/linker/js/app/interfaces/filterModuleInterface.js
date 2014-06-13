'use strict';

angular.module('treateaseApp')
  .factory('filterModuleInterface', ['$rootScope', 'eventService', 'googleGeocoder', 'geolocation', '$log', '$q', function($rootScope, eventService, geocoder, geolocation, $log, $q) {

    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
    var locations = {
      geolocation: {
        position: {
          coords: {
            accuracy: 150,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: defaultCoordinates.lat(),
            longitude: defaultCoordinates.lng(),
            speed: null
          },
          timestamp: null
        },
        latLng: defaultCoordinates // new google.maps.LatLng
      },
      manual: {
        input: null,
        geocodedResults: null
      }
    };
    var useGeolocation = 'geolocation';
    var useManual = 'manual';
    var whichLocation = useGeolocation;

    var areGeolocationPositionsEqual = function(a, b) {
      if (a === null && b === null) {
        return true;
      } else if (a === null || b === null) {
        return false;
      } else if (a.coords === null && b.coords === null) {
        return true;
      } else if (a.coords === null || b.coords === null) {
        return false;
      } else {
        return a.coords.latitude === b.coords.latitude
          && a.coords.longitude === b.coords.longitude
          && a.coords.accuracy === b.coords.accuracy;
      }
    };

    var serviceAPI = {
      processLocationFilter: function(newLocationFilter) {
        var deferred = $q.defer();
        if (!newLocationFilter.useGeolocation) {
          // geocode customAddress
          var oldInput = locations.manual.input;
          locations.manual.input = newLocationFilter.customAddress;
          geocoder.geocode(locations.manual.input)
            .then(function(results) {
//              $log.debug('geocode top 1 result', results[0]);
              locations.manual.geocodedResults = results;
              whichLocation = useManual;
              eventService.broadcastRootEvent(eventService.currentLocationChangedEvent);
              deferred.resolve(results[0])
            }, function(reason) {
              $log.error('geocode failed', reason);
              locations.manual.input = oldInput;
              deferred.reject();
            });
        } else {
          // use geolocation
          geolocation.getLocation()
            .then(function(geolocationObj) {
//              if (whichLocation === useManual || (!areGeolocationPositionsEqual(geolocationObj.position, locations.geolocation.position))) {
              $log.debug('filterModuleInterface service: updating geolocation', geolocationObj);
              locations.geolocation.position = geolocationObj.position;
              locations.geolocation.latLng = new google.maps.LatLng(geolocationObj.coords.latitude, geolocationObj.coords.longitude);
              whichLocation = useGeolocation;
              eventService.broadcastRootEvent(eventService.currentLocationChangedEvent);
//              }
              deferred.resolve(locations.geolocation.latLng);
            }, function(reason) {
              $log.error('geolocation failed', reason);
              deferred.reject();
            });
        }
        return deferred.promise;
      },

      getCurrentLocationLatLng: function() {
        if (whichLocation === useManual) {
          if (locations.manual !== null && locations.manual.geocodedResults !== null && locations.manual.geocodedResults.length > 0) {
            $log.debug('using manual location')
            return locations.manual.geocodedResults[0].geometry.location;
          } else {
            return null;
          }
        } else { // useGeolocation
          return locations.geolocation.latLng;
        }
      }

    };
    return serviceAPI;
  }]);