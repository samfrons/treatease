'use strict';

angular.module('treateaseApp')
  .factory('messenger', ['$rootScope', '$resource', '$log', 'TalkResource', 'ProfileResource', 'eventService', '$location', 
  	function($rootScope, $resource, $log, TalkResource, ProfileResource, eventService, $location) {

  	var serviceAPI = {

		findTalkByUsersId: function(talkParams, success, error){
			// console.log('messenger service talkParams', talkParams);

			TalkResource.findTalkByUsersId(talkParams).$promise
	        .then(function(response) {

	            if(success) {
	            	// console.log('findTalkByUsersId service response', response);
	            	ProfileResource.pushTalkIdToUserProfile({"talk":response.talkId, "users":response.users}).$promise
		            	.then(function(response) {
				            	// console.log('done');
					        })
				      	.catch(function(err) {
					        // $log.error('Database Error!', err);
					        // if (error) error(err);
				      	});
	            	success (response)
	            }
	        })
		      .catch(function(err) {
		        // $log.error('Database Error!', err);
		        // if (error) error(err);
		      });
	    },

	    findTalkInfoByTalkId: function(talkId, success, error){
	    	TalkResource.findTalkInfoByTalkId(talkId).$promise
	        .then(function(response) {
	            if(success) {
	            	success (response)
	            }
	        })
		      .catch(function(err) {
		        // $log.error('Database Error!', err);
		        // if (error) error(err);
		      });
	    },

	    getUserInfoForMessengerById: function(id, success, error){
	    	ProfileResource.getUserInfoForMessengerById(id).$promise
		        .then(function(response) {
		        	// console.log('response in messenger', response);
		            if(success) {
		            	success (response)
		            }
		        })
		      .catch(function(err) {
		        // $log.error('Database Error!', err);
		        // if (error) error(err);
		      });
	    },

		addMessage: function(message, success, error){
			TalkResource.addMessage(message).$promise
				.then(function(response) {
					 if(success) {
		            	socket.post('/api/chat', message, function(socketResponse){
		            	})
		            	success (response)
		            }
				})
				.catch(function(err) {
			        // $log.error('Database Error!', err);
			        // if (error) error(err);
			      });

		},

		changeIsReadedFlag: function(data, success, error){
			// TalkResource.addMessage(message).$promise
			TalkResource.changeIsReadedFlag(data).$promise
				.then(function(response) {

				 	if(response.status === 200) {
				 		
		            	$rootScope.changeIsReadedFlagFinished = true;
		            		
	            	}
				})
				.catch(function(err) {
			        // $log.error('Database Error!', err);
			        // if (error) error(err);
		      	});

		},
	}    
    return serviceAPI;




  }]);