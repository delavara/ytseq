angular.module('ytseq').directive('clock', function($window) {
    return {
        restrict: "E",
        require: '^board',
        template: '<div><button ng-click="start()">Start</button></div>',
        scope: {
            name: '@',
            out: '@'
        },
        link: function(scope, element, attrs, boardController) {
            scope.sequencer = sequencer();
            var setOut = function(data) {
              scope.out = data;
              scope.$apply();
            }.bind(scope);

            scope.sequencer.outCb = setOut;

            scope.start =  function() {
                if (scope.sequencer.playOn) {
                    scope.sequencer.stop();
                    return;
                }
                scope.sequencer.start();
            };
            boardController.setModule(scope);
        }
    };
});
