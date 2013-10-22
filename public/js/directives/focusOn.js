define([], function(){
  "use strict";

  var focusOn = ["$timeout", "$parse", function($timeout, $parse) {
    return {
      link: function(scope, element, attrs) {
        var model = $parse(attrs.focusOn);
        scope.$watch(model, function(value) {
          if(value === true) { 
            $timeout(function() {
              element[0].focus(); 
            });
          }
        });
      }
    };
  }];

  return focusOn;
});