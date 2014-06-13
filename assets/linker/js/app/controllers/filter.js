'use strict';

angular.module('treateaseApp')
  .controller('FilterCtrl', ['$scope', 'meetingFilters', '$filter', '$log', function ($scope, meetingFilters, $filter, $log) {

    $scope.locationFilter = meetingFilters.getLocationFilter();

    $scope.setCustomAddress = function() {
      $log.debug('FilterCtrl.customAddressClicked customAddress='+$scope.locationFilter.customAddress);
      $scope.locationFilter.useGeolocation = $scope.locationFilter.customAddress === ''; // turn off geolocation
      meetingFilters.setLocationFilter($scope.locationFilter);
    };

    $scope.setGeolocation = function() {
      // $log.debug('FilterCtrl.clickGeolocation');
      $scope.locationFilter.useGeolocation = true
      $scope.locationFilter.customAddress = '';
      meetingFilters.setLocationFilter($scope.locationFilter);
    };




    // filters
    $scope.dayFilterItems = [{
      display: 'm',
      selected: false,
      filter: 1
    }, {
      display: 't',
      selected: false,
      filter: 2
    }, {
      display: 'w',
      selected: false,
      filter: 3
    }, {
      display: 't',
      selected: false,
      filter: 4
    }, {
      display: 'f',
      selected: false,
      filter: 5
    }, {
      display: 's',
      selected: false,
      ngClass: 'weekend',
      filter: 6
    }, {
      display: 's',
      selected: false,
      ngClass: 'weekend',
      filter: 0
    }];

    $scope.onDayFilterChanged = function(selectedFilters) {
      $log.info('onDayFilterChanged in FilterCtrl', selectedFilters);

      var filterFunction = function(item) {
        return $filter('filter')(selectedFilters, item.dayNumber).length > 0;
      };

      meetingFilters.setDayFilter(filterFunction);
    };

    $scope.fellowshipFilterItems = [{
      display: 'Narcotics Anonymous',
      selected: false,
      filter: 'NA'
    }, {
      display: 'Alcoholics Anonymous',
      selected: false,
      filter: 'AA'
    }, {
      display: 'Crystal Meth Anonymous',
      selected: false,
      filter: 'CMA'
    }, {
      display: 'Pills Anonymous',
      selected: false,
      filter: 'PA'
    }, {
      display: 'Marijuana Anonymous',
      selected: false,
      filter: 'MA'
    }, {
      display: 'Cocaine Anonymous',
      selected: false,
      filter: 'CA'
    }, {
      display: 'HAMS',
      selected: false,
      filter: 'HAMS'
    }, {
      display: 'Moderation Management',
      selected: false,
      filter: 'MM'
    }];

    $scope.onFellowshipFilterChanged = function(selectedFilters) {
      $log.info('onFellowshipFilterChanged in FilterCtrl', selectedFilters);

      var filterFunction = function(item) {
        return $filter('filter')(selectedFilters, item.fellowship.abbrevName).length > 0;
      };

      meetingFilters.setFellowshipFilter(filterFunction);
    };


    $scope.timeFilterItems = [{
      display: 'morning',
      filter: {start: 600, end: 1200 },
      selected: false
    },{
      display: 'afternoon',
      filter: { start: 1200, end: 1700 },
      selected: false
    },{
      display: 'evening',
      filter: { start: 1700, end: 2000 },
      selected: false
    },{
      display: 'night',
      filter: { start: 2000, end: 600 },
      selected: false
    }];

    var isTimeBetween = function(timeAsNumber, start, end) {
      if (end < start) {
        return isTimeBetween(timeAsNumber, start, 2399) || isTimeBetween(timeAsNumber, 0, end);
      }
      return start <= timeAsNumber && timeAsNumber <= end;
    };

    $scope.onTimeFilterChanged = function(selectedTimeFilters) {
      $log.info('onTimeFilterChanged in FilterCtrl', selectedTimeFilters);
      var filterFunction = function(item) {
        var isValidTime = false;
        angular.forEach(selectedTimeFilters, function(timeFilter) {
//          $log.debug(item.timeAsNumber, timeFilter.start, timeFilter.end, isTimeBetween(item.timeAsNumber, timeFilter.start, timeFilter.end))
          if (isTimeBetween(item.timeAsNumber, timeFilter.start, timeFilter.end)) {
            isValidTime = true;
          }
        });
        return isValidTime;
      };

      meetingFilters.setTimeFilter(filterFunction);
    };


  }]);


