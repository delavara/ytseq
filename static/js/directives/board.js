angular.module('ytseq').directive('board', function($window) {
    return {
        controller: ['$scope', function($scope) {
            $scope.modules = [];
            $scope.setModule = scope.setModule,
            $scope.getModule = scope.getModule
        }],
        scope: {
            modules: '='
        },
        link: function(scope, element, attr) {
            scope.modules = [];

            scope.setModule = function(module) {
                $scope.modules[module.name] = module;
            };

            scope.getModule = function(moduleName) {
                return $scope.modules[moduleName];
            };

        }
    };
});
