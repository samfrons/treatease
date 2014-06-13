'use strict';

angular.module('treateaseApp')
  .controller('videoCtrl', ['$scope', '$log', function ($scope, $log) {

  	var myVideo=document.getElementById('bg-video');
    var volumeButton = document.getElementById('volume-button');
    	var state = false;
    	
    	$scope.sound = function () {
        if (state == false) { //with sound
      		myVideo.muted = state;
        	volumeButton.className="sound-off-icon";
    		  state = true;
    		  return state; 
        } 
        else {
          myVideo.muted = state; //without sound
          volumeButton.className="sound-on-icon";
          state = false;
          return state;  
        }

   	 }
 }])