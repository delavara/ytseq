var youtubeTag = document.createElement('script');
youtubeTag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(youtubeTag, firstScriptTag);

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

        step: function(count) {
            this.currentIndex = (this.currentIndex + 1) % this.steps;
            this.trigger({index: this.currentIndex, start: 0});
        },

        start: function() {
            this.playOn = true;
            this.trigger({index: this.currentIndex, start: 1});
            this.startInterval();
        },

        startInterval() {
            var interval = T('interval', {interval:"BPM128 L16"}, this.step.bind(this));
            interval.start();
        },

        stop: function() {
          this.playOn = false;
          this.trigger({start: -1});
          clearTimeout(this._setTimeoutId);
          this._setTimeoutId = null;
        }
   };
};
var clock = clock();

var youtubeQueue = function (videoIds, onReady) {
    var queue =  {
        players: [],
        previousIndex: -1,
        input: function(data) {
            if (data.start === true)
                playAll();
            currentIndex = data.index % players.length
            if (previousIndex >= 0) {
                var lastPlayer = players[previousIndex];
                lastPlayer.setVolume(0);
            }
            var player = players[currentIndex];
            player.setVolume(100);
            previousIndex = currentIndex;
        }
    };

    return queue;
};

var ytseqApp = angular.module('ytseq', []);

ytseqApp.directive('youtubevideo', function($window) {
    return {
        restrict: "E",
        template: '<div class="col s3 hoverable"><div class="video-container"><div></div></div></div>',
        scope: {},
        link: function(scope, element, attrs) {
            scope.videoId = attrs.videoid;
            scope.play = function() {
                this.player.playVideo();
            }

            scope.stop = function() {
                this.player.stopVideo();
            }

            scope.volume = function(level) {
                this.player.setVolume(level);
            }

            var videoContainerDiv = element.children().children();
            scope.player = new YT.Player(videoContainerDiv.children()[0], {
                height: '250',
                width: '340',
                videoId: attrs.videoid
            });
        },
    }
});

ytseqApp.directive('youtubesequencer', function($window, $compile) {

    return {
        restrict: "E",
        template: '<div class="queue-wrapper"></div>',
        scope: {
            players: '='
        },
        link: function(scope, element, attrs) {
            scope.videoIds = ['FA0wAheWjYw', 'OaUiepqoYYI', 'IVpTCz62uS8', '24tWz7gmngI', 'pAkgtw4tdWY', 'KBluUZ4NnZg'];
            scope.players = [];
            scope.previousIndex = -1;
            scope.currentIndex = 0;

            scope.playAll = function() {
                this.players.map(function(obj) {obj.isolateScope().play()});
            }

            scope.stopAll = function() {
                this.players.map(function(obj) {obj.isolateScope().stop()});
            };

            clock.trigger = function(data) {
                if (data.start > 0)
                    scope.playAll();
                if (data.start < 0)
                    scope.stopAll();
                if (data.start == 0) {
                    scope.currentIndex = data.index % scope.players.length
                    if (scope.previousIndex >= 0) {
                        var lastPlayer = scope.players[scope.previousIndex];
                        lastPlayer.isolateScope().volume(0);
                    }

                    var player = scope.players[scope.currentIndex];
                    player.isolateScope().volume(100);
                    scope.previousIndex = scope.currentIndex;
                }
            }.bind(scope);

            $window.onYouTubeIframeAPIReady = function() {
                var numRows = scope.videoIds.length / 4;
                var rows = [];

                for (var ix = 0; ix < numRows; ix++) {
                    var row = angular.element("<div class='row'>");
                    rows.push(row);
                }

                for (var ix = 0; ix < scope.videoIds.length; ix++) {
                    var youtubeVideo = angular.element('<youtubeVideo>');
                    youtubeVideo.attr('videoid', scope.videoIds[ix]);
                    youtubeVideo = $compile(youtubeVideo)(scope);
                    scope.players.push(youtubeVideo);
                    currentRow = Math.floor(ix / 4);
                    rows[currentRow].append(youtubeVideo);
                }

                for (var ix = 0; ix < rows.length; ix++) {
                    element.children().append(rows[ix]);
                }

                scope.$apply();
            }
        },
    }
});

ytseqApp.directive('clock', function($window) {
    return {
        restrict: "E",
        template: '<button class="btn col s12 {{buttonColor}}" ng-click="start()">{{action}}</button>',
        scope: {
            name: '@'
        },
        link: function(scope, element, attrs) {
            scope.out = {};
            scope.action = "start";
            scope.buttonColor = "green";

            scope.start =  function() {
                if (clock.playOn) {
                    clock.stop();
                    this.action = 'start';
                    this.buttonColor = "green";
                    return;
                }
                clock.start();
                this.action = 'stop';
                this.buttonColor = "red";
            }
        }
    };
});
