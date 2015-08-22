'use strict'

describe('clock directive', function() {
    var $scope;
    var element;

    beforeEach(function() {
        module('ytseq');
        inject(function($rootScope, $compile) {
            element = angular.element('<clock name="obj"></clock>');
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

    it('should have a start function', function() {
        var scope = element.isolateScope();
        expect(scope.start).toBeDefined();
    });

    it('should start the clock when start is called', function() {
        var scope = element.isolateScope();
        spyOn(scope.clock, 'start');
        scope.start();
        expect(scope.clock.start).toHaveBeenCalled();
    });

    it('should call the trigger when start is called', function() {
        var scope = element.isolateScope();
        spyOn(scope.clock, 'trigger');
        scope.start();
        expect(scope.clock.trigger).toHaveBeenCalled();
    });

    it('should update out when triggered', function() {
        var scope = element.isolateScope();
        spyOn(scope, 'out');
        scope.start();
        expect(scope.out).toBeDefined();
    });

});
