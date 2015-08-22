var clock = function() {
    return {
        tempo: 500,
        currentIndex: 0,
        playOn: false,
        _setTimeoutId: null,
        steps: 16,

        trigger: function(data, index) {
            return;
        },

        step: function() {
            this.currentIndex = (this.currentIndex + 1) % this.steps;
            this.trigger({index: this.currentIndex, start: true});
        },

        start: function() {
            this.playOn = true;
            this.step();
            this._setTimeoutId = setTimeout(this.step, this.tempo);
        },

        stop: function() {
          this.playOn = false;
          clearTimeout(this._setTimeoutId);
          this._setTimeoutId = null;
        }
   };
};

angular.module('ytseq').directive('clock', function($window) {
    return {
        restrict: "E",
        template: '<div><button ng-click="start()">Start</button></div>',
        scope: {
            name: '@'
        },
        link: function(scope, element, attrs) {
            scope.out = {};
            scope.clock = clock();

            var setTrigger = function(data) {
              scope.out = data;
              scope.$apply();
            }.bind(scope);

            scope.clock.trigger = setTrigger;

            scope.start =  function() {
                if (scope.clock.playOn) {
                    scope.clock.stop();
                    return;
                }
                scope.clock.start();
            }.bind(scope);

            scope.stop = function() {
                scope.clock.stop();
            };
        }
    };
});
