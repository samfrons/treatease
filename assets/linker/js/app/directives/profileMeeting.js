angular.module('treateaseApp').directive('profileMeeting', [function () {
  var directiveDefinitionObject = {
    priority: 0,
    templateUrl: 'views/widgets/profileMeeting.html',
    controller: function($scope){
      $scope.meetingDetail = {
        title: "Dummy meeting One",
        location: {
          address: {
            address1: "Dummy address location one",
            city: {
              city: "Singapore",
              state: "Singapore State"
            }
          }
        },
        fellowship: {
          displayText: "hi there!"
        }
      };
    },
    replace: false,
    transclude: false,
    restrict: 'E',
    scope: false,
  };
  return directiveDefinitionObject;
}]);