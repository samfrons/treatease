'use strict';

angular.module('treateaseApp')
  .controller('MessagesCtrl', ['$scope', '$rootScope', '$routeParams', 'messenger', 'ProfileResource', '$location', 'auth', '$log', 'mySocket', 'userQueryForRootScope',
    function ($scope, $rootScope, $routeParams, messenger, ProfileResource, $location, auth, $log, mySocket, userQueryForRootScope) {

      //=================================================== 
      userQueryForRootScope.query().then(function(response){
        // console.log('response from factory in controller', response);
        $rootScope.currentUser = response[0];
      //===============================================
      
        $rootScope.changeIsReadedFlagFinished = false;

        mySocket.on('message', function (message) {
          // console.log('socket.on1', message);
          messenger.getUserInfoForMessengerById({id: message.data.author}, function(author){
            // console.log('author', author)
            $scope.newMessageIo =  {
              author: author.username,
              updatedAt: message.data.date,
              message: message.data.message,
              img: author.custom_profile_image
            }

            if ($rootScope.currentUser.id !== message.data.author){
              $rootScope.newMessageCounter++
            }
              $scope.messages.push($scope.newMessageIo)


          })
        })

// ==============================================get current profile info
        ProfileResource.profile({ username: $rootScope.currentUser.username }).$promise
          .then(function(response) {
            $scope.userProfile = response.profile;
            // console.log(' $scope.userProfile', $scope.userProfile);
          })
          .catch(function(errResponse) {
            // TODO: error handling
          });
  // =======================================================================

        $scope.userProfile   = '';
        $scope.newMessage    = {};
        $rootScope.receivers = [];
        $scope.receiversName = [];
        $scope.receiversData = [];
        $scope.myMessages    = [];


        messenger.findTalkInfoByTalkId({id: $routeParams.talk_id}, function(response){
          if(response.talksInfo[0]){
            $scope.messages = response.talksInfo[0].messages;
            // console.log('$scope.messages123', $scope.messages);
            _.each(response.talksInfo[0].users, function(val, key, list){
              $scope.receivers.push(val.id)
              if ($scope.receivers.length === response.talksInfo[0].users.length) {
                _.each($scope.receivers, function(val, key, lish){
                  messenger.getUserInfoForMessengerById({id: val}, function(response){
                    $scope.receiversData.push(response);
                    $scope.receiversName.push(response.username);
                    if($scope.receiversData.length === $scope.receivers.length){
                      _.each($scope.messages, function(val, num, list){
                        _.each($scope.receiversData, function(user, key, list) {
                          if(user.id === val.author){
                            $scope.messages[num].author = user.username;
                            $scope.messages[num].img    = user.custom_profile_image;
                          };
                        });
                      });      
                    };
                  });
                });
              };
            });  
          }
          else {
            $scope.messages = [];
          }
        });

        $scope.sendMessage = function(){
          $scope.newMessage =  {
            talkId: $routeParams.talk_id,
            author: $scope.userProfile.user.id,
            date: new Date(),
            message: $scope.privateMessage
          }
          messenger.addMessage($scope.newMessage, function(response){      
              $scope.privateMessage = null;
          })    
        };

        $scope.iReadMessages = function(){
          _.each($scope.messages, function(message, index){
            // console.log('iReadMessages message',index, ' - ', message);
            if(message.isReaded === false && message.author !== $scope.userProfile.user.username) {
              // console.log('messagemessage message', message);
              messenger.changeIsReadedFlag({talk_id:$routeParams.talk_id, currentUser: $scope.userProfile.user.id});
              $rootScope.newMessageCounter--
            }

          })
        }


        $scope.beginTalking = function(currentUserId, targetUserId){
          // find and open talk with current user and target user
          // console.log('currentUserId', currentUserId);
          // console.log('targetUserId', targetUserId);

          if(currentUserId !== targetUserId) {

            var talkParams = {
              currentUserId: currentUserId,
              targetUserId: targetUserId 
            }  

            //find chat current user with target user
            messenger.findTalkByUsersId(talkParams, function(response){
              // console.log('qweqweqweqweqweqweqw', response);
              $rootScope.receivers = [];
              $rootScope.talk = response.talkId;
              // $rootScope.receivers = response.users;
              _.each(response.users, function(val, key, list){
                  // console.log('val', val);
                  $rootScope.receivers.push(val.id)
              })
              // $rootScope.messages = response.messages;
              $location.path('/messages/' + $rootScope.talk);
            })

          }

        };
      }) 
  }])
