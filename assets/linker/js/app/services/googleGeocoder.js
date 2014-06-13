'use strict';

angular.module('treateaseApp')
  .factory('googleGeocoder', ['$q', '$rootScope', '$log', function($q, $rootScope, $log) {

    var geocoder = new google.maps.Geocoder();

    var serviceAPI = {
      geocode: function(address) {
        var deferred = $q.defer();
        var request = {
          address: address
        };

        geocoder.geocode(request, function(results, status) {
          $rootScope.$apply(function() { // use $apply because geocoder is outside of angular
            $log.debug('geocode response', status, results);
            if (status === google.maps.GeocoderStatus.OK) {
              $log.debug('geocode1')
              deferred.resolve(results);
            } else {
              $log.debug('geocode2')
              deferred.reject(status);
            }
          });
        });

        return deferred.promise;
      }
    };
    return serviceAPI;
  }]);
