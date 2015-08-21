'use strict'

describe('clock directive', function() {
    beforeEach(module('ytseq'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
      }));


    it('should load list of objects with youtubeIds', function() {
        var $scope = {videoIds: ['test_id']};
        var controller = $controller('sequenceController', {$scope: $scope});
        expect($scope.players.length).toEqual(1);
        expect($scope.players[0].youtubeId).toEqual('test_id');
    });
});
