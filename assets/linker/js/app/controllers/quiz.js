'use strict';

angular.module('treateaseApp')
  .controller('quizCtrl', ['$scope', '$http', '$timeout',  function ($scope, $http, $timeout) {
    console.warn('quizCtrl works');
    $scope.apiKey = 's2pqimhzja';
    $scope.questions = [];
    $scope.activeIndex = 0;
    $scope.activeIndexSingle = 0;
    $scope.defaultAnswers = [];
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
                  sq.activeIndex = sq.question_id + "_" + sq.sub_question_id + "_" + sq.minOpt
                })
              })
              $scope.questions.push(q);
              // console.log('$scope.questions', $scope.questions);
            });
          }
        })
    }

    //============================ $scope.optValue default
    $timeout(function(){
      _.each($scope.questions, function(question, index){
        for ( var i = 0; i < question.sub_questions.length; i++) { 
          $scope.defaultAnswers.push({
            q_id     : index +1,
            sq_id    : i + 1,
            answer   : 0
          })
          // console.log('$scope.defaultAnswers[index]', $scope.defaultAnswers);
        }
      })
    }, 1000)
    //============================ $scope.optValue default



    $scope.answer = function (optValue, questionId, subquestionId){
      // $scope.optValue      = optValue;
      // $scope.questionId    = questionId;
      // $scope.subquestionId = subquestionId;

      console.log('optValue, questionId, subquestionId', optValue, questionId, subquestionId);



    }


    $scope.setActive = function (option, sub_question) {
      sub_question.activeIndex = sub_question.question_id + "_" + sub_question.sub_question_id + "_" + option.option_id;
    };

    $scope.setActiveForSlideWithoutSubquestions = function (index) {
      $scope.activeIndexSingle = index
    };
 }]) 