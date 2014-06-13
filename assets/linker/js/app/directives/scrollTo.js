// Version 0.0.2 derived from https://github.com/iameugenejo/ngScrollTo
// AngularJS simple hash-tag scroll alternative
// this directive uses click event to scroll to the target element
//
// <div ng-app="app">
//   <div ng-controller="myCtrl">
//     <a scroll-to="section1">Section 1</a>
//   </div>
//   ...
//   <div id="section1">
//      <h2>Section1</h2>
//      <a scroll-to="">Back to Top</a>
//   </div>
// </div>
//

'use strict';

angular.module('treateaseApp')
  .directive('scrollTo', ['$window', function($window){
    return {
      restrict : 'AC',
      compile : function() {

        var document = $window.document;

        function scrollInto(idOrName) {//find element with the given id or name and scroll to the first element it finds
          if (!idOrName) {
            //move to top if idOrName is not provided
            $window.scrollTo(0, 0);
          }

          // try to find element by id attribute
          var targetElement = document.getElementById(idOrName);
          if (!targetElement) {
            // couldn't find element by id, try name
            targetElement = document.getElementsByName(idOrName);

            if (targetElement && targetElement.length) {
              targetElement = targetElement[0];
            } else {
              targetElement = null;
            }
          }

          if (targetElement) { // if an element is found, scroll to the element
            targetElement.scrollIntoView();
          }
          //otherwise, ignore
        }

        return function(scope, element, attr) {
          element.bind('click', function(event){
            scrollInto(attr.scrollTo);
          });
        };
      }
    };
  }]);