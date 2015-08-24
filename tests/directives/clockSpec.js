'use strict'

describe('clock directive', function() {
    var $scope;
    var element;

    beforeEach(function() {
        module('ytseq');
        inject(function($rootScope, $compile) {
            element = angular.element('<board><clock name="obj"></clock></board>');
            $compile(element)($rootScope);
        });
      });

    it('should have a name', function() {
        var scope = element.isolateScope();
        expect(scope.name).toEqual("obj");
    });

    it('should have an out', function() {
        var scope = element.isolateScope();
        expect(scope.out).toBeDefined();
    });

    describe('start', function () {
        it('should update out when triggered', function() {
            var scope = element.isolateScope();
            spyOn(scope, 'out');

            scope.start();

            expect(scope.out.index).toBeDefined();
            expect(scope.out.start).toBeDefined();
        });

        it('should start the clock when start is called', function() {
            var scope = element.isolateScope();

            scope.start();

            expect(scope.clock.playOn).toBe(true);
        });

        it('should call the trigger when start is called', function() {
            var scope = element.isolateScope();
            spyOn(scope.clock, 'trigger');

            scope.start();

            expect(scope.clock.trigger).toHaveBeenCalled();
        });

        it('should have a setTimeoutId', function() {
            var scope = element.isolateScope();

            scope.start();

            expect(scope.clock._setTimeoutId).toBeDefined();
        });
    });

    describe('stop', function() {

        it('should stop the clock', function() {
            var scope = element.isolateScope();
            expect(scope.stop).toBeDefined();
            scope.start();

            scope.stop();

            expect(scope.clock.playOn).toBe(false);
        });

        it('should clear the timeout', function() {
            var scope = element.isolateScope();
            expect(scope.stop).toBeDefined();
            scope.start();

            scope.stop();

            expect(scope.clock._setTimeoutId).toBe(null);
        });
    });
});
