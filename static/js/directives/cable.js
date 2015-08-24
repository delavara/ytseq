angular.module('ytseq').directive('cable', function($window) {
    return {
        restrict: "E",
        template: "<div>I'm a cable</div>",
        scope: {
            from: '@',
            to: '@',
            getModule: '&',
            setModule: '&'
        },
        link: function(scope, element, attrs) {
           scope.fromModule = scope.getModule(scope.from);
           scope.toModule = scope.getModule(scope.to);
          // var cb = function(newValue, oldVal) {
          //     scope.toModule.inp(newValue);
          // }.bind(scope);
          // scope.fromModule.$watch("out", cb);
        }
    };
});
