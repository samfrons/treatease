'use strict';

angular.module('treateaseApp')
  
 .factory('userQueryForRootScope', ['auth' , '$q', '$rootScope', function(auth, $q, $rootScope){
  return {
        query : function() {
          // console.log('userQueryForRootScope init');
          var d = $q.defer();           
          auth.checkLogin(function(status, user){
          d.resolve(user);
         })
          return $q.all([d.promise]);
          
        }
  }

}])