'use strict';

angular.module('treateaseApp')
  .controller('quizCtrl', ['$scope', 'QuizResource', '$http',  function ($scope, QuizResource, $http) {
    console.warn('quizCtrl works');
    $scope.apiKey = 's2pqimhzja';
    $scope.questions = [];
    get_token();
    function get_token() {
      $http.jsonp('http://www.drugabuse.gov/qm/get_token?key=' + $scope.apiKey + '&callback=JSON_CALLBACK')
        .success(function (data) {
        console.log('get_token', data);
        if(data.status == 1) {
          console.log('get_token status 1');
          $scope.token_id = data.token_id;
          get_all_questions();
        } else {
          console.log('get_token status 0');
          $scope.errorMessage = 'Unexpected error.'
        }
     })  
    };

    function get_all_questions() {
      $http.jsonp('http://www.drugabuse.gov/qm/get_all_questions?key=' + $scope.apiKey + '&callback=JSON_CALLBACK')
        .success(function (all_questions) {
          console.log('get_all_questions', all_questions);
          if(all_questions.status == 1) {
            _.each(all_questions.questions, function(question, index){
              $scope.questions[index] = question;
            })
          }
        })
    }



    // QuizResource.get_token({'key' : $scope.apiKey, 'callback' : 'JSON_CALLBACK'}).$promise
    //   .then(function(response) {
    //     console.log('response', response);
    //   });

 }]) 