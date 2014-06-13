'use strict';

angular.module('treateaseApp')
  .filter('currentUserFirst', ['$rootScope', '$log', function ($rootScope, $log) {
    return function(array, usernameField) {
      if (!angular.isArray(array)) return array;
      if (!$rootScope.currentUser || !$rootScope.currentUser.username) return array;
      var currentUsername = $rootScope.currentUser.username;
      if (!usernameField) {
        usernameField = 'username';
      }

      var currentUserItems = [];
      var otherItems = [];
      angular.forEach(array, function(item, idx) {
        if (item[usernameField] === currentUsername) {
          currentUserItems.push(item);
        } else {
          otherItems.push(item);
        }
      });

      var sortedArray = currentUserItems;
      angular.forEach(otherItems, function(item, idx) {
        sortedArray.push(item);
      });
      return sortedArray;
    };
  }]);
