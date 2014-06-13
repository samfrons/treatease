'use strict';

angular.module('treateaseApp')
  .controller('ProfileCtrl', ['$scope', '$routeParams', 'auth', '$log', '$rootScope', 'ProfileResource', 'meetingCache', '$location', 'uploadService', function ($scope, $routeParams, auth, $log, $rootScope, ProfileResource, meetingCache, $location, uploadService) {


    // initialize page vars
    $scope.userProfile = {};
    $scope.isCurrentUser = false;
    $scope.bigProfileImage = false;


    // set username to find
    if (!$routeParams.username) {
      if ($rootScope.isLoggedIn) {
        // if no username is set in $routeParams, show current user
        $location.path($location.path() + '/' + auth.user().username);
        $log.debug('ProfileCtrl: redirect to currentUser profile page');
      } else {
        // not logged in, redirect to login
        $location.path('/login');
      }
    } else {
      $log.debug('ProfileCtrl: username=' + $routeParams.username);
      // get user info
      ProfileResource.profile({ username: $routeParams.username }).$promise
        .then(function(response) {
          $scope.userProfile = response.profile;
          $rootScope.userProf = response.profile
          // console.log('$rootScope.userProf = profile user from routeparams', $rootScope.userProf )
          $scope.isCurrentUser = response.profile.isCurrentUser;

          // process all meetings
          angular.forEach($scope.userProfile.meetings, function(meetings, type) {
            angular.forEach(meetings, function(meeting) {
              meetingCache.processMeeting(meeting);
            });
          });
        })
        .catch(function(errResponse) {
          // TODO: error handling
        });
    }

    // console.warn('===$scope.userProfile',$scope.userProfile);
    // console.warn('===$rootScope.currentUser',$rootScope.currentUser);
    $scope.talkId = $scope.userProfile;


    /* upload */

    $scope.beginUpload = function(){
      document.getElementById("uploader").click();
    }
    $scope.files = [];

    $scope.$watch('files', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (newValue[0].size > 51200) {
              $scope.files = [];
              $scope.bigProfileImage = true;
          } else{
              console.log('Controller: $scope.files changed. Start upload.');
              for (var i = 0, length = $scope.files.length; i < length; i++) {
                  // Hand file off to uploadService.
                  uploadService.send($scope.files[i], '/api/changeProfileImage/' + $routeParams.username);
              }
            
          }
        }
    }, true);

    $rootScope.$on('upload:loadstart', function () {
        console.log('Controller: on `loadstart`');
    });

    $rootScope.$on('upload:error', function () {
        console.log('Controller: on `error`');
    });
    
  
    $rootScope.$on('upload:success', function (e, base64Img) {
      location.reload();
      // console.log('Controller: on `success`', e, e.name, " >>>> ", e.currentScope);
      // if(base64Img){
      //   base64Img = base64Img.responseText;
      //   e.currentScope.$parent.userProfile.user.custom_profile_image = base64Img.base64data;
      // }
    });
    

  }]);