'use strict';

angular.module('treateaseApp')
  .controller('MapCtrl', ['$scope', '$http', '$rootScope', 'eventService', 'meetingCache', 
                          '$log', 'GenericApiResource', 'mapStyleStorage',
                          function($scope, $http, $rootScope, eventService, meetingCache, 
                            $log, GenericApiResource, mapStyleStorage) {

    $scope.meetings = [];
    var loadMarkerData = function() {
      $scope.markersArray =[]
      // load latest filtered meetings from cache
      var meetingsList = meetingCache.getMeetingsFromCache('MapCtrl.loadMarkerData');
      // clear markers
      angular.forEach($scope.meetings, function(meeting) {
        meeting.marker.setMap(null);
      });

      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          meetingId: meeting.meetingId,
          map: $scope.map,
          position: meeting.location.latLng(),
          icon: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.isSoon?'-soon':'') + '.png'
          },
        });
        angular.extend(meeting, { marker: marker });
        $scope.markersArray.push(meeting.marker)
      });

      var markerCluster = new MarkerClusterer($scope.map, $scope.markersArray, 
      {
        maxZoom: 24, //  if your zoom > maxZoom than appeared standart not clusterred markers
        gridSize: 20, //  distance where markers will be clustered 
        zoomOnClick: false,
        ignoreHidden: true,
        styles: [{
          url: '/images/cluster28.png',
          height: 28,
          width: 27,
          anchorIcon: [55, -10],
          textColor: '#FFFFFF',
          textSize: 13,
        }]
      });
// //=========================================================== Overlapping Marker Spiderfier
    google.maps.event.addListener(markerCluster, "clusterclick", function (cluster) {
      console.log('cluster clickeddddddd 1', cluster);

      // // cluster.clusterIcon_.setMap(null)
      _.each(cluster.markers_, function(item){
        item.setMap(null)
      })

      var gm = google.maps;
      var oms = new OverlappingMarkerSpiderfier($scope.map, {
        markersWontMove: true, 
        // markersWontHide: true,
        // keepSpiderfied : true 
      });
      var iw = new gm.InfoWindow();
      iw.close();
      oms.addListener('click', function(marker, event) {
        if(marker){
          console.log('marker est');
          marker.setMap(null)

        }
        // console.log('click on marker', marker);
        // // $scope.openMarkerInfo(marker)
        // iw.setContent('how to add marker content for meetingId = <b>' + marker.meetingId + '</b>?');
        // iw.open($scope.map, marker);
      });
      oms.addListener('spiderfy', function(markers) {
        cluster.clusterIcon_.setMap(null)
        // for(var i = 0; i < markers.length; i ++) {
        //   markers[i].setIcon(cluster.markers_[i].icon.url);
        //   markers[i].setShadow(null);
        // }
        iw.close();
      });
      oms.addListener('unspiderfy', function(markers) {
        markerCluster.setMap($scope.map)
        oms.clearMarkers();
        _.each(markers, function(item){
          item.setMap(null);  
        })
      });

      for (var i = 0; i < cluster.markers_.length; i ++) {
        var datum = cluster.markers_[i];
        var marker = new gm.Marker({
          position: cluster.center_,
          map: $scope.map,
          icon: cluster.markers_[i].icon.url,
          meetingId: datum.meetingId
        })
        // marker.setMap(null)
        oms.addMarker(marker);
      }
    })
//=========================================================== Overlapping Marker Spiderfier
     
      $scope.meetings = meetingsList;

    };



    // // closeInfoWindow = function() {
    // //     infoWindow.close();
    // // };
    // if($scope.myInfoWindow) {
    //   console.log('$scope.myInfoWindow');
    //   google.maps.event.addListener($scope.map, 'click', $scope.myInfoWindow.close());
    // }





    $scope.openMarkerInfo = function(meeting) {
      $scope.meeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };


    // default map options
    $scope.mapOptions = {
      center     : meetingCache.getCurrentLocationLatLng(),
      zoom       : 15,
      mapTypeId  : google.maps.MapTypeId.ROADMAP,
      styles     : mapStyleStorage.mapStyleFunc()
    };

    var setCurrentLocationMarker = function(latLng) {
      if (angular.isDefined($scope.currentLocationMarker)) {
        // delete old location
        $scope.currentLocationMarker.setMap(null);
        $scope.currentLocationMarker = null;
      }
      $scope.currentLocationMarker = new google.maps.Marker({
        map: $scope.map,
        position: latLng,
        icon: 'images/current-location-map.png',
        // shadow: 'http://www.google.com/mapfiles/shadow50.png'
      });
    };

    var waitingForMapBounds = false;

    var setMapCenter = function() {
      if (angular.isDefined(meetingCache.getCurrentLocationLatLng())) {
        waitingForMapBounds = true;
        $scope.map.setCenter(meetingCache.getCurrentLocationLatLng());
        setCurrentLocationMarker(meetingCache.getCurrentLocationLatLng());
      }
    };


    var updateMapBounds = function() {
//      $log.debug('updateMapBounds', waitingForMapBounds)
      meetingCache.setMapBounds($scope.map.getBounds());
//      if (waitingForMapBounds) {
//        loadMarkerData();
        waitingForMapBounds = false;
//      }
    };


    $scope.mapEvents = {
      dragging: false,
      bounds_changed: function($event, $params) {
        if (!$scope.mapEvents.dragging) {
          updateMapBounds();
        }
      },
      dragstart: function($event, $params) {
        $scope.mapEvents.dragging = true;
      },
      drag: function($event, $params) {
        $scope.mapEvents.dragging = true;
      },
      dragend: function($event, $params) {
        $scope.mapEvents.dragging = false;
        updateMapBounds();
      },
      zoom_changed: function($event, $params) {
      },
      idle: function($event, $params) {
        updateMapBounds();
      },
      center_changed: function($event, $params) {

      },
      click: function($event, $params){
        $scope.myInfoWindow.close()
      }
    };



    $scope.$watch('map', function() {
      if (angular.isDefined($scope.map)) {
        $log.debug('map ready');
        eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadMarkerData);
//        eventService.registerRootEventHandler(eventService.locationFilterChangedEvent, loadingFunc);
        eventService.registerRootEventHandler(eventService.currentLocationChangedEvent, setMapCenter);
        // TODO: ??use locationchanged event to get currLocation from meetingchache?
      }
    });




  }]);
