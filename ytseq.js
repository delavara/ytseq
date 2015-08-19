var sequencer = {
    tempo:5000,
    youTubePlayers:[],
    currentIndex: 0,
    playOn:false
};

sequencer.start = function() {
  setTimeout(function() {
    player.setVolume(0);
    if (playOn) {
      playerNumber++;
      playVideo(playerNumber % steps);
    }
  }, tempo);
};


var ytseqApp = angular.module('ytseq', []);

ytseqApp.controller('sequenceController', ['$scope', function($scope) {
    $scope.videoIds = $scope.videoIds || [];
    $scope.players = [];
    $scope.sequencer = sequencer;

}]);

ytseqApp.controller('mockYoutubeController', ['$scope', function($scope) {
    $scope.is_muted = true;
    $scope.message = "no way";

    $scope.mute = function(videoId) {
        $scope.is_muted = !$scope.is_muted;
        if ($scope.is_muted) {
            $scope.message = 'muted';
        } else {
            $scope.message = 'no way';
        }
    };
}]);

ytseqApp.directive('youtubePlayer', function($scope) {

});
