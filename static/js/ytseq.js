var sequencer = function() { return {
    tempo: 500,
    currentIndex: 0,
    playOn: false,
    _setTimeoutId: null,
    steps: 16,

    outCb: function(data, index) {
        return;
    },

    step: function() {
        console.log('stepping');
        this._setTimeoutId = setTimeout(function() {
            this.currentIndex = this.currentIndex + 1 % this.steps;
            this.outCb({index: this.currentIndex, start: true});
            this.step();
        }.bind(this), this.tempo);
    },

    start: function() {
        console.log('starting!');
        this.step();
        this.playOn = true;
    },

    stop: function() {
      this.playOn = false;
      clearTimeout(this._setTimeoutId);
    }
   };
};


var test = function(data, index) {
    var list = [1, 2, 3, 4];
};

var ytseqApp = angular.module('ytseq', []);

ytseqApp.directive('board', function($window) {
    return {
        scope: {
            modules: '='
        },
        controller: function($scope) {
            $scope.modules = $scope.modules || [];
            return {
                setModule: function(module) {
                    $scope.modules[module.name] = module;
                },
                getModule: function(moduleName) {
                    return $scope.modules[moduleName];
                }
            };
        },
        link: function() {}
    };
});

ytseqApp.directive('clock', function($window) {
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
              console.log("data: " + data);
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

ytseqApp.directive('cable', function($window) {
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
           boardController.getModule(scope.from).$watch( "out", cb);
        }
    };
});

ytseqApp.directive('youtubesequencer', function($window) {
    return {
        restrict: "E",
        require: "^board",
        template: '<div ng-repeat="video in videos">{{video}}</div>',
        scope: {
            name: '@',
            videoIds: '=videoids',
            inp: '&',
            currentIndex: '=',
            players: '='
        },
        link: function(scope, element, attrs, boardController) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            scope.players = [];
            scope.previousIndex = -1;
            scope.playAll = function() {
                for (var player in scope.players) {
                        scope.players[player].playVideo();
                }
            }.bind(scope);

            $window.onYouTubeIframeAPIReady = function() {
                // order is important so we loop by index
                for (var ix = 0; ix < scope.videoIds.length; ix++) {
                    var videoId = scope.videoIds[ix];
                    var div = document.createElement('div');
                    element.append(div);
                    var player = new YT.Player(div, {
                        height: '200',
                        width: '340',
                        videoId: videoId
                    });
                    scope.players.push(player);
                };
            }.bind(scope);

            scope.inp = function(data) {
                if (data === undefined)
                        return
                if (scope.players === [])
                        return
                if (data.start === true)
                    scope.playAll();
                scope.currentIndex = data.index % scope.players.length
                if (scope.previousIndex >= 0) {
                    var lastPlayer = scope.players[scope.previousIndex];
                        console.log(scope.previousIndex + " OFF " + data.index);
                    lastPlayer.setVolume(0);
                }
                console.log(scope.currentIndex + " ON ");
                var player = scope.players[scope.currentIndex];
                player.setVolume(100);
                scope.previousIndex = scope.currentIndex;
            }.bind(scope);

            boardController.setModule(scope);
        },
    }
});
