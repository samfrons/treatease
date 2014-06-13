'use strict';

angular.module('treateaseApp')
  .controller('TalksCtrl', ['$scope', '$rootScope', 'messenger', 'ProfileResource', '$location', 'auth', '$log', 'mySocket', 'userQueryForRootScope',
    function ($scope, $rootScope, messenger, ProfileResource, $location, auth, $log, mySocket, userQueryForRootScope) {
      // console.log('TalksCtrl init');
      //=================================================== 
        userQueryForRootScope.query().then(function(response){
          // console.log('response from factory in controller', response);
          $rootScope.currentUser = response[0];
      //===============================================
          $scope.userProfile = '';
          $scope.newMessage = {};
          $scope.members = [];
          var i = 0;

          mySocket.on('message', function (message) {
            messenger.getUserInfoForMessengerById({id: message.data.author}, function(author){
              // console.log('author', author);
              $scope.newMessageIo =  {
                lastAuthor: author.username,
                updatedAt: message.data.date,
                lastMessage: message.data.message,
                img: author.custom_profile_image,
                talkId: message.data.talkId
              }

              if ($rootScope.currentUser.id !== message.data.author){
                $rootScope.newMessageCounter++
              }
             $scope.foundedTalk = _.find($scope.talks, function(talk) {
                return talk.talkId === message.data.talkId;
              });

             // console.log('$scope.foundedTalk', $scope.foundedTalk);
             $scope.foundedTalk.img         = $scope.newMessageIo.img
             $scope.foundedTalk.lastAuthor  = $scope.newMessageIo.lastAuthor
             $scope.foundedTalk.lastMessage = $scope.newMessageIo.lastMessage
             $scope.foundedTalk.updatedAt   = $scope.newMessageIo.updatedAt
             $scope.foundedTalk.talkId      = $scope.newMessageIo.talkId

            })
          });

      //============================================== get current profile info
          ProfileResource.profile({ username: $rootScope.currentUser.username }).$promise
            .then(function(response) {
              // console.log('response', response);
              $scope.userProfile = response.profile;
              $scope.talks = []

      //============================================== get all current user's dialogs
              _.each(response.profile.user.talks, function(val, index){
                // console.log('index', index);
                messenger.findTalkInfoByTalkId({id : val}, function(response){
                  // console.log('key', key);
                  // console.log('$scope.userProfile.user.talks.length - 1', $scope.userProfile.user.talks.length - 1);
                  if(response.talksInfo[0].messages.length !== 0){
                    // console.log('RES', response);
                    $scope.talks.push({ lastMessage     : response.talksInfo[0].messages[response.talksInfo[0].messages.length - 1].message,
                                        updatedAt       : response.talksInfo[0].messages[response.talksInfo[0].messages.length - 1].updatedAt, 
                                        lastAuthor      : response.talksInfo[0].messages[response.talksInfo[0].messages.length - 1].author,
                                        talkId          : response.talksInfo[0].id,
                                        members         : response.talksInfo[0].users,
                                        isReaded        : response.talksInfo[0].messages[response.talksInfo[0].messages.length - 1].isReaded
                                      });
                    i = i + 1;
                    // console.log('$scope.talks.', $scope.talks);
                    // console.log('i =', i);
                  }
      //============================================== get last authors info from profile collection
                  if( $scope.talks.length === $scope.userProfile.user.talks.length  ) { 
                    // console.log('$scope.talks', $scope.talks);
                    _.each($scope.talks, function(talk, key, list){
                      // console.log('load info about talk ', key);
                      talk.membersAvatars = [];
                      // console.warn('++++ TALK', talk.members);
                      _.each(talk.members, function(member, memberIndex) {
                        messenger.getUserInfoForMessengerById({ id: member.id }, function(memberResponse){
                          // console.log('---- memberResponse', memberResponse);
                          talk.membersAvatars.push({memberAvatarImg: memberResponse.custom_profile_image, memberName: memberResponse.username})
                          messenger.getUserInfoForMessengerById({id: talk.lastAuthor}, function(response){
                            $scope.talks[key].lastAuthor = response.username;
                            $scope.talks[key].img = response.custom_profile_image;
                          });

                        })
                      })       
                    })
                    
                  }
                  
                });
              });
            })
            .catch(function(errResponse) {
              // TODO: error handling
            });
      //=======================================================================

          $scope.goToThisTalk = function (id) {
            $location.path('/messages/' + id);
          }

        })
  }])