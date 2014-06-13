'use strict';
/* globals _ */

angular.module('treateaseApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 'ui.showhide', 'ui.map', 'ui.keypress', 'ui.bootstrap', 'angularytics', 'btford.socket-io'])

  // grab lodash/underscore into an injectable constant
  .constant('_', _)
  .constant('apiRoot', '/')
  .factory('mySocket', function (socketFactory) {
    var mySocket = socketFactory();
    // console.log('mySocket', mySocket);
    // mySocket.forward('create');
    return mySocket;
  })
  // .factory('currentUserQueryResolve', function($rootScope, $location, auth, $log, $q, $anchorScroll, $routeParams, messenger){
  //     var authCheck = function() {
  //       console.log('init1');
  //       var deferred = $q.defer();
  //       //выполняем запрос на получение данных
  //       //если данные успешно приняты выполним  deferred.resolve()
  //       //если произошла ошибка выполним deferred.reject()
  //       auth.checkLogin(function(successData) {
  //               deferred.resolve(successData); 
  //       }, function(errorData) {
  //               deferred.reject();
  //       });
  //       return deferred.promise;
  //     };
  //     var delay = function($q, $timeout) {
  //       console.log('init2');
  //       var delay = $q.defer();
  //       $timeout(delay.resolve, 2000);
  //       return delay.promise;
  //     };
  //     authCheck();
  //     delay();
  // })

  // angular routing
  .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        template: '<div></div>',
        controller: 'BrowserCheckCtrl',
        access: routingConfig.accessLevels.public
      })
      // .when('/main', {
      //   templateUrl: '/corporate/main',
      //   controller: 'MainCtrl',
      //   // access: routingConfig.accessLevels.public
      // })
      // // --------------mobile routes
      // .when('/mobile', {
      //   templateUrl: '/corporate/mobileMain',
      //   controller: 'MainCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/mobile/main', {
      //   templateUrl: '/corporate/mobileMain',
      //   controller: 'MainCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // // ----------END mobile routes
      // .when('/map', {
      //   templateUrl: '/corporate/map',
      //   controller: 'MapCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/inspiration', {
      //   templateUrl: '/corporate/inspiration',
      //   controller: 'InspirationCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/press', {
      //   templateUrl: '/corporate/press',
      //   controller: 'PressCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/emailListSignup', {
      //   templateUrl: '/corporate/emailListSignup',
      //   controller: 'EmailListSignupCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // // --------------Tumblr routes
      // .when('/tumblr', {
      //   templateUrl: '/tumblr/tumblr',
      //   controller: 'TumblrCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/tumblr/page/:page', {
      //   template: '/tumblr/tumblr',
      //   controller: 'TumblrCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/tumblr/post/:id', {
      //   template: '/tumblr/tumblr-post-detail',
      //   controller: 'TumblrPostDetailCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // // ----------END tumblr routes
      // .when('/headline', {
      //   templateUrl: '/corporate/headline',
      //   controller: 'HeadlineCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/investors', {
      //   templateUrl: '/corporate/investors',
      //   controller: 'InvestorsCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/aboutUs', {
      //   templateUrl: '/corporate/aboutUs',
      //   controller: 'AboutUsCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/thankYou', {
      //   templateUrl: '/corporate/thankYou',
      //   controller: 'ThankYouCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/signupFlow', {
      //   templateUrl: '/corporate/signupFlow',
      //   controller: 'SignupFlowCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      // .when('/mission', {
      //   templateUrl: '/corporate/mission',
      //   controller: 'MissionCtrl',
      //   access: routingConfig.accessLevels.public
      // })
      .when('/meetings', {
        templateUrl: '/partials/index.ejs',
        controller: 'MeetingSearchCtrl',
        access: routingConfig.accessLevels.public
      })
      // .when('/meetingSearch', {
      //   redirectTo: '/meetings'
      // })
      // .when('/detail/:meetingId/:meetingTitle?', {
      //   templateUrl: '/partials/meetingDetail',
      //   controller: 'MeetingDetailCtrl',
      //   access: routingConfig.accessLevels.public
      // })

      // // TODO: rethink profile routing, add params
      // .when('/profile/:username?', {
      //   templateUrl: '/partials/profile',
      //   controller: 'ProfileCtrl',
      //   access: routingConfig.accessLevels.user,
      //   resolve: {
      //     customBodyClass: function() { return 'profile'; }
      //   }
      // })
      // .when('/login', {
      //   templateUrl: '/partials/login',
      //   controller: 'LoginCtrl',
      //   access: routingConfig.accessLevels.anon,
      //   resolve: {
      //     customBodyClass: function() { return 'login'; }
      //   }
      // })
      // .when('/forgot', {
      //   templateUrl: '/partials/forgot',
      //   controller: 'LoginCtrl',
      //   access: routingConfig.accessLevels.anon,
      //   resolve: {
      //     customBodyClass: function() { return 'forgot'; }
      //   }
      // })
      // .when('/recovery', {
      //   templateUrl: '/partials/recovery',
      //   controller: 'LoginCtrl',
      //   access: routingConfig.accessLevels.anon,
      //   resolve: {
      //     customBodyClass: function() { return 'recovery'; }
      //   }
      // })
      // .when('/register', {
      //   templateUrl: '/partials/register',
      //   controller: 'RegisterCtrl',
      //   access: routingConfig.accessLevels.anon,
      //   resolve: {
      //     customBodyClass: function() { return 'register'; }
      //   }
      // })
      // .when('/home', {
      //   templateUrl: '/partials/home',
      //   access: routingConfig.accessLevels.public
      // })

      // //======================================communication
      // .when('/messages', {
      //   templateUrl: '/partials/talks',
      //   controller: 'TalksCtrl',
      //   access: routingConfig.accessLevels.user,
      //   // resolve: {
      //   //  data: 'userQuery'
      //   // }
      // })
      // .when('/messages/:talk_id?', {
      //   templateUrl: '/partials/messages',
      //   controller: 'MessagesCtrl',
      //   access: routingConfig.accessLevels.user
      // })
      // // .when('/videos/halfbaked.com', {
      // //   templateUrl: '/corporate/halfbacked.com.ejs',
      // //   access: routingConfig.accessLevels.public
      // // })
      .otherwise({
        redirectTo: '/meetings'
      });

    var interceptor = ['$location', '$q', '$log', function($location, $q, $log) {
      var success = function(response) {
        return response;
      };

      var error = function(response) {
        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      };

      return function(promise) {
        return promise.then(success, error);
      };
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  }])

  // google analytics
  .config(['AngularyticsProvider', function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers([ 'Console', 'GoogleUniversal' ]);
  }])
  .run(['Angularytics', function(Angularytics) {
    Angularytics.init();
  }])

  .run(['$rootScope', '$window', '$location', 'auth', '$log', '$q', '$anchorScroll', 
        '$routeParams', 'messenger', '$timeout', 
          function ($rootScope, $window, $location, auth, $log, $q, $anchorScroll, 
                    $routeParams, messenger, $timeout) {
   
    var checkLoginDeferred = $q.defer();
    $rootScope.newMessageCounter = 0
    auth.checkLogin(function(foundLoggedInUser) {
      if (foundLoggedInUser) {
        $log.debug('checkLogin: initialized user from server: '+auth.user().username, auth.user());
        //==================new messages counter start================//
        _.each(auth.user().talks, function(talkId){
          messenger.findTalkInfoByTalkId({id: talkId}, function(response){
            _.each(response.talksInfo[0].messages, function(message){
              if (message.isReaded === false && message.author !==  auth.user().id) {
                $rootScope.newMessageCounter++
              }
            })
          })
        })
        //==================new messages counter end==================//
        checkLoginDeferred.resolve();
      } else {
        checkLoginDeferred.resolve();
        // $rootScope.currentUser = auth.user();
        // $log.debug('checkLogin: using default user $rootScope.currentUser', $rootScope.currentUser);
      }
    })

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        checkLoginDeferred.promise
          .then(function() {
            if (angular.isUndefined(next.redirectTo)) { // don't check auth on redirect
              $rootScope.error = null; // TODO: $rootScope.error is not used
              if (!auth.authorize(next.access)) {
                // user isn't authorize to view this next route
                if (auth.isLoggedIn()) {
                  $location.path('/meetings');
                } else {
                  $location.path('/login');
                }
              }
            }
          });
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      // dynamic body background
      if (angular.isDefined(current.resolve) && angular.isDefined(current.resolve.customBodyClass)) {
        // $log.debug('$routeChangeSuccess custom='+current.resolve.customBodyClass())
        $rootScope.bodyClass = current.resolve.customBodyClass();
      } else {
        // default body class
        // $log.debug('$routeChangeSuccess default')
        $rootScope.bodyClass = '';
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
      }
    });
  }])

  .run(['$rootScope', 'auth', 'eventService', '$log', function($rootScope, auth, eventService, $log) {
    $rootScope.getPartialUrl = function(file) {
      return 'partials/' + file;
    };

    $rootScope.getPartialCorporateUrl = function(file) {
      return 'corporate/' + file;
    };

    // global auth accessors
    $rootScope.isLoggedIn = auth.isLoggedIn();
    $rootScope.currentUser = auth.user();
    $rootScope.accessLevels = auth.accessLevels();
    $rootScope.userRoles = auth.userRoles();
    eventService.registerRootEventHandler(eventService.userChangedEvent, function(user) {
      $rootScope.isLoggedIn = auth.isLoggedIn();
      $rootScope.currentUser = auth.user();
      // console.log('USER', $rootScope.currentUser)
      $rootScope.accessLevels = auth.accessLevels();
      $rootScope.userRoles = auth.userRoles();
    });

    $rootScope.doLogout = function() {
      auth.logout(function() {
        // TODO: handle logout, maybe refresh current page or goto main?
      }, function(err) {
        // TODO: handle err
      });
    };

    // debug
    $rootScope.showDebugHeader = false;
  }])

//current location detector 
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.location = $location;
  }]);
//current location detector


function DropdownCtrl($scope) {
  $scope.items = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
}