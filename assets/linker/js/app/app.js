'use strict';
/* globals _ */

angular.module('treateaseApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize'])

  // grab lodash/underscore into an injectable constant
  .constant('_', _)
  .constant('apiRoot', '/')

  // angular routing
  .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main.ejs',
        controller: 'videoCtrl',
        access: routingConfig.accessLevels.public
      })
      .when('/quiz', {
        templateUrl: '/partials/quiz.ejs',
        controller: 'videoCtrl',
        access: routingConfig.accessLevels.public
      })
      
      .otherwise({
        redirectTo: '/'
      });

//     var interceptor = ['$location', '$q', '$log', function($location, $q, $log) {
//       var success = function(response) {
//         return response;
//       };

//       var error = function(response) {
//         if(response.status === 401) {
//           $location.path('/login');
//           return $q.reject(response);
//         }
//         else {
//           return $q.reject(response);
//         }
//       };

//       return function(promise) {
//         return promise.then(success, error);
//       };
//     }];

//     $httpProvider.responseInterceptors.push(interceptor);
  }])

//   // google analytics
//   .config(['AngularyticsProvider', function(AngularyticsProvider) {
//     AngularyticsProvider.setEventHandlers([ 'Console', 'GoogleUniversal' ]);
//   }])
//   .run(['Angularytics', function(Angularytics) {
//     Angularytics.init();
//   }])

//   .run(['$rootScope', '$window', '$location', 'auth', '$log', '$q', '$anchorScroll', 
//         '$routeParams', 'messenger', '$timeout', 
//           function ($rootScope, $window, $location, auth, $log, $q, $anchorScroll, 
//                     $routeParams, messenger, $timeout) {
   
//     var checkLoginDeferred = $q.defer();
//     $rootScope.newMessageCounter = 0
//     auth.checkLogin(function(foundLoggedInUser) {
//       if (foundLoggedInUser) {
//         $log.debug('checkLogin: initialized user from server: '+auth.user().username, auth.user());
//         //==================new messages counter start================//
//         _.each(auth.user().talks, function(talkId){
//           messenger.findTalkInfoByTalkId({id: talkId}, function(response){
//             _.each(response.talksInfo[0].messages, function(message){
//               if (message.isReaded === false && message.author !==  auth.user().id) {
//                 $rootScope.newMessageCounter++
//               }
//             })
//           })
//         })
//         //==================new messages counter end==================//
//         checkLoginDeferred.resolve();
//       } else {
//         checkLoginDeferred.resolve();
//         // $rootScope.currentUser = auth.user();
//         // $log.debug('checkLogin: using default user $rootScope.currentUser', $rootScope.currentUser);
//       }
//     })

//     $rootScope.$on('$routeChangeStart', function (event, next, current) {
//         checkLoginDeferred.promise
//           .then(function() {
//             if (angular.isUndefined(next.redirectTo)) { // don't check auth on redirect
//               $rootScope.error = null; // TODO: $rootScope.error is not used
//               if (!auth.authorize(next.access)) {
//                 // user isn't authorize to view this next route
//                 if (auth.isLoggedIn()) {
//                   $location.path('/meetings');
//                 } else {
//                   $location.path('/login');
//                 }
//               }
//             }
//           });
//     });

//     $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//       // dynamic body background
//       if (angular.isDefined(current.resolve) && angular.isDefined(current.resolve.customBodyClass)) {
//         // $log.debug('$routeChangeSuccess custom='+current.resolve.customBodyClass())
//         $rootScope.bodyClass = current.resolve.customBodyClass();
//       } else {
//         // default body class
//         // $log.debug('$routeChangeSuccess default')
//         $rootScope.bodyClass = '';
//         $location.hash($routeParams.scrollTo);
//         $anchorScroll();
//       }
//     });
//   }])

//   .run(['$rootScope', 'auth', 'eventService', '$log', function($rootScope, auth, eventService, $log) {
//     $rootScope.getPartialUrl = function(file) {
//       return 'partials/' + file;
//     };

//     $rootScope.getPartialCorporateUrl = function(file) {
//       return 'corporate/' + file;
//     };

//     // global auth accessors
//     $rootScope.isLoggedIn = auth.isLoggedIn();
//     $rootScope.currentUser = auth.user();
//     $rootScope.accessLevels = auth.accessLevels();
//     $rootScope.userRoles = auth.userRoles();
//     eventService.registerRootEventHandler(eventService.userChangedEvent, function(user) {
//       $rootScope.isLoggedIn = auth.isLoggedIn();
//       $rootScope.currentUser = auth.user();
//       // console.log('USER', $rootScope.currentUser)
//       $rootScope.accessLevels = auth.accessLevels();
//       $rootScope.userRoles = auth.userRoles();
//     });

//     $rootScope.doLogout = function() {
//       auth.logout(function() {
//         // TODO: handle logout, maybe refresh current page or goto main?
//       }, function(err) {
//         // TODO: handle err
//       });
//     };

//     // debug
//     $rootScope.showDebugHeader = false;
//   }])

// //current location detector 
//   .run(['$rootScope', '$location', function($rootScope, $location) {
//     $rootScope.location = $location;
//   }]);
// //current location detector


// function DropdownCtrl($scope) {
//   $scope.items = [
//     "The first choice!",
//     "And another choice for you.",
//     "but wait! A third!"
//   ];
// }