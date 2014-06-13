'use strict';

angular.module('treateaseApp')
  .factory('eventService', ['$rootScope', '$log', function($rootScope, $log) {
    var serviceAPI = {
      dataCacheRefreshedEvent: 'eventService__dataCacheRefreshed',
      dataCacheMapBoundsChangedEvent: 'eventService__dataCacheMapBoundsChanged',
      currentLocationChangedEvent: 'eventService__currentLocationChanged',
      filterChangedEvent: 'eventService__filterChanged',
      locationFilterChangedEvent: 'eventService__locationFilterChanged',
      meetingSearchClickedEvent: 'eventService__meetingSearchClicked',
      userChangedEvent: 'eventService__userChanged',

      broadcastRootEvent: function(eventname, args) {
       // $log.debug('Event::broadcastRootEvent: ', eventname, args);
        $rootScope.$broadcast(eventname, args);
      },
      broadcastEvent: function(scope, eventname, args) {
        scope.$broadcast(eventname, args);
      },
      registerEventHandler: function(scope, eventname, listener) {
        scope.$on(eventname, listener);
      },
      registerRootEventHandler: function(eventname, listener) {
       // $log.debug('Event::registerRootEventHandler: ', eventname, listener);
        $rootScope.$on(eventname, listener);
      }
    };
    return serviceAPI;
  }]);

