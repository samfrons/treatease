'use strict';

angular.module('treateaseApp')
  .controller('PagedListCtrl', ['$scope', 'eventService', 'meetingCache', '$log', '$window', function ($scope, eventService, meetingCache, $log, $window) {

    $scope.items = [];

    // init pagination vars
    $scope.totalItems = $scope.items.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.maxSize = 4;
    $scope.showFilters = true;
    // $scope.showHideButton = function() {
    //   $scope.showFilters = !$scope.showFilters;
    //   console.log('$scope.showFilters2 = ', $scope.showFilters)
    //   return $scope.showFilters;
    // }


    // function resizeWatcher() { //show and hide filters and meetings
    //   console.log('resize work');

    //   $scope.$apply(function () {
    //     $scope.currentWindowWidth = $window.innerWidth;
    //     console.log('$scope.currentWindowWidth = ', $scope.currentWindowWidth);
    //     if ($window.innerWidth>767) {
    //       $scope.showFilters = true;
    //     }else {
    //       $scope.showFilters = false;  
    //     }
    //     console.log('$scope.showFilters = ', $scope.showFilters)
    //     return $scope.showFilters
    //   })
    // }
    // //first call of resizeWatcher when the dom is loaded
    // angular.element(document).ready(function () {
    //    resizeWatcher()
    // });

    // //calling resizeWatcher on resize event
    // window.onresize = resizeWatcher;

    // register loadItems
    var loadItems = function() {
      $scope.items = meetingCache.getMeetingsFromCache('PagedListCtrl::loadItems');
      $scope.totalItems = $scope.items.length;
      $scope.currentPage = 1;
    };
    eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadItems);
    eventService.registerRootEventHandler(eventService.filterChangedEvent, loadItems);

  }]);