'use strict';

angular.module('treateaseApp')
  .factory('QuizResource', ['$resource', '$log', 'apiRoot', function($resource, $log, apiRoot) {
    return $resource(
      'http://www.drugabuse.gov/qm/' + ':action', {
        action: '@action',
        username: '@username'
      }, {
        get_token: {
          method: 'GET',
          params: { action: 'get_token' }
        },
        get_all_questions: {
          method: 'GET',
          params: { action: 'get_all_questions' }
        },
        get_question: {
          method: 'GET',
          params: { action: 'get_question' }
        },
        get_result: {
          method: 'GET',
          params: { action: 'get_result' }
        },
        answer: {
          method: 'POST',
          params: { action: 'answer' }
        }

      });
  }]);
