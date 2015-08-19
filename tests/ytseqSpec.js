'use strict'

describe('ytSeq', function() {
    beforeEach(module('ytseq'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
      }));

    describe('sequenceController', function() {

        it('should load list of objects with youtubeIds', function() {
            var $scope = {videoIds: ['test_id']};
            var controller = $controller('sequenceController', {$scope: $scope});
            expect($scope.players.length).toEqual(1);
            expect($scope.players[0].youtubeId).toEqual('test_id');
        });
    });
});
