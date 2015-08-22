'use strict'

describe('board directive', function() {
    var scope, directiveElem, compile;

    beforeEach(function() {
        module('ytseq');
        inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
        directiveElem = compileDirective();
      });

    function compileDirective(tpl) {
        var elem = tpl || '<board></board>';
        var compiledElement = compile(elem)(scope);
        scope.$digest()
        return compiledElement;
    };

    it('should have a modules array', function() {
        var name = directiveElem.append('<clock name="test1"></div>');
        var isolatedScope = directiveElem.isolateScope();
        expect(isolatedScope.modules.length).toBe(0);
    });
});
