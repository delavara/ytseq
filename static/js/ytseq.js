var sequencer = {
    tempo: 500,
    currentIndex: 0,
    playOn: false,
    _setTimeoutId: null,
    steps: 16,

    outCb: function(data, index) {
        return;
    },

    step: function() {
        this._setTimeoutId = setTimeout(function() {
            this.currentIndex = this.currentIndex + 1 % this.steps;
            this.outCb({}, this.currentIndex);
            this.step();
        }.bind(this), this.tempo);
    },

    start: function() {
        this.playOn = true;
        this.step();
    },

    stop: function() {
      this.playOn = false;
      clearTimeout(this._setTimeoutId);
    }
};


var test = function(data, index) {
    var list = [1, 2, 3, 4];
};

sequencer.outCb = test;
sequencer.start();


var ytseqApp = angular.module('ytseq', []);

ytseqApp.controller('sequenceController', ['$scope', function($scope) {
    $scope.videoIds = $scope.videoIds || [];

}]);
