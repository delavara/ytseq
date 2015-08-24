'use strict'

describe('cable directive', function() {
    var $scope;
    var element;

    beforeEach(function() {
        module('ytseq');
        inject(function($rootScope, $compile) {
            element = angular.element('<board><cable from="obj1" to="obj2"></cable><board>');
            $compile(element)($rootScope);
            });
        });

    it('should have a from', function() {
        var scope = element.find('cable').isolateScope();
        expect(scope.from).toEqual("obj1");
        });

    it('should have an to', function() {
        var scope = element.find('cable').isolateScope();
        expect(scope.to).toEqual("obj2");
        });

    describe('link', function() {
            var from;
            var to;

            beforeEach(function() {
                inject(function($rootScope, $compile) {
                    element = angular.element('<board><clock name="obj1"></clock><clock name="obj2"></clock><cable from="obj1" to="obj2"></cable><board>');
                    from = element.find('div');
                    to = element.find('clock');
                    $compile(element)($rootScope);
                });
            });

            it('should find the from and to modules', function() {
                var boardScope = element.isolateScope();
                var expectedFrom = boardScope.getModule('obj1');
                var expectedTo = boardScope.getModule('obj2');

                var scope = element.find('cable').isolateScope();

                expect(scope.getModule).toBeDefined();
                expect(scope.from).toEqual(expectedFrom);
                expect(scope.to).toEqual(expectedTo);
                });
            });
});
