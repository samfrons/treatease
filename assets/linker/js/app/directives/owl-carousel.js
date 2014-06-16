var app = angular.module('treateaseApp', []);
app.directive('owlcarousel',function(){
 	return {
		restrict : "A",
		replace  : false,
		templateUrl : '',
        link: function(scope, elem, attrs) {
	      elem.bind('click', function() {
	        elem.css('background-color', 'white');
	        scope.$apply(function() {
	          scope.color = "white";
	        });
	      });
	      elem.bind('mouseover', function() {
	        elem.css('cursor', 'pointer');
	      });
	    }
	}
 
});