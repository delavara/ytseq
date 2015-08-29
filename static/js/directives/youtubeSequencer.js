angular.module('ytseq').directive('youtubesequencer', function($window) {
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
