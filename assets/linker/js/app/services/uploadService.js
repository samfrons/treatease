'use strict';

angular.module('treateaseApp')
  .factory('uploadService', ['$rootScope', '$log', function($rootScope, $log) {

    return {
      send: function (file, url) {
        var data = new FormData();
        var xhr = new XMLHttpRequest();

        // When the request starts.
        xhr.onloadstart = function () {
          $log.info('Factory: upload started: ', file.name);
          $rootScope.$emit('upload:loadstart', xhr);
        };

        // When the request has failed.
        xhr.onerror = function (e) {
          $rootScope.$emit('upload:error', e);
        };

        xhr.onload = function(e){
          if(xhr.status === 200){
            $rootScope.$broadcast('upload:success', xhr);
          }else{
            $rootScope.$emit('upload:error', e);
          }
        };

        // Send to server, where we can then access it with $_FILES['file].
        data.append('file', file, file.name);
        xhr.open('POST', url);
        xhr.send(data);
      }
    };
  }]);