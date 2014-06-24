'use strict';

angular.module('treateaseApp')
  .controller('quizCtrl', ['$scope', '$rootScope', '$http', '$timeout',  function ($scope, $rootScope, $http, $timeout) {
    console.warn('quizCtrl works');
    $scope.apiKey = 's2pqimhzja';
    $scope.questions = [];
    $scope.activeIndex = 0;
    $scope.activeIndexSingle = 0;
    $scope.defaultAnswers = [];
    $rootScope.resultsCanBeLoaded = false;
    get_token();
    function get_token() {
      $http.jsonp('http://www.drugabuse.gov/qm/get_token?key=' + $scope.apiKey + '&callback=JSON_CALLBACK')
        .success(function (data) {
        // console.log('get_token', data);
        if(data.status == 1) {
          // console.log('get_token status 1');
          $scope.token_id = data.token_id;
          get_all_questions();
        } else {
          // console.log('get_token status 0');
          $scope.errorMessage = 'Unexpected error.'
        }
     })  
    };

    function get_all_questions() {
      $http.jsonp('http://www.drugabuse.gov/qm/get_all_questions?key=' + $scope.apiKey + '&callback=JSON_CALLBACK')
        .success(function (all_questions) {
          console.log('get_all_questions', all_questions);
          $scope.questions = [];
          $scope.lastIndex = 1;
          if(all_questions.status == 1) {
          _.each(all_questions.questions, function(q, index){
              // console.log('q', q);
              _.each(q.sub_questions, function(sq){
                sq.options = q.options;
                sq.minOpt = sq.options[0].option_id;
                _.each(sq.options, function(opt){
                  if (opt.option_id < sq.minOpt) {
                    sq.minOpt = opt.option_id;
                  }
                  sq.answer = opt.option_value;
                  sq.answerId = opt.option_id;
                  sq.activeIndex = sq.question_id + "_" + sq.sub_question_id + "_" + sq.minOpt
                })
              })
              $scope.questions.push(q);
              // console.log('$scope.questions', $scope.questions);
            });
          }
        })
    }




    $scope.answer = function (sq, optvalue, optId){
      sq.answer = optvalue;
      sq.answerId = optId;
      console.log('QUESTIONS, $scope.questions[$rootScope.slideNumber]', $scope.questions, $scope.questions[$rootScope.slideNumber]);
      _.each($scope.questions, function(question, q_index){
        $scope.submitAnswer = {
          "key": $scope.apiKey,
          "token_id": $scope.token_id,
          "question_id": q_index + 1,
          "answers": [
            {
              "sub_question_id": "1",
              // "option_id": $scope.questions[$rootScope.slideNumber].sub_questions[0].answerId
            },{
              "sub_question_id": "2",
              // "option_id": $scope.questions[$rootScope.slideNumber].sub_questions[1].answerId
            },{
              "sub_question_id": "3",
              // "option_id": $scope.questions[$rootScope.slideNumber].sub_questions[2].answerId
            },{
              "sub_question_id": "4",
              // "option_id": $scope.questions[$rootScope.slideNumber].sub_questions[3].answerId
            },{
              "sub_question_id": "5",
              // "option_id": $scope.questions[$rootScope.slideNumber].sub_questions[4].answerId
            },
            
          ]
        };

      })

      console.log($scope.submitAnswer);



    }


    $scope.setActive = function (option, sub_question) {
      sub_question.activeIndex = sub_question.question_id + "_" + sub_question.sub_question_id + "_" + option.option_id;
    };

    $scope.setActiveForSlideWithoutSubquestions = function (index) {
      $scope.activeIndexSingle = index
    };
 }]) 