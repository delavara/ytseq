angular.module('ytseq').directive('cable', function($window) {
    return {
        restrict: "E",
        require: "^board",
        template: "<div>I'm a cable</div>",
        scope: {
            from: '@',
            to: '@'
        },
        link: function(scope, element, attrs, boardController) {
           var to = boardController.getModule(scope.to);
           var cb = function(newValue, oldVal) {
               to.inp(newValue);
           }.bind(to);
           boardController.getModule(scope.from).$watch("out", cb);
        }
    };
});
