'use strict';

angular.module('treateaseApp')
  .controller('MeetingDetailSmallCtrl', ['$scope', function ($scope) {
    if (angular.isDefined($scope.currentMeeting)) {
      $scope.meeting = $scope.currentMeeting;
    }
  }]);
