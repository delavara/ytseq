angular.module('ytseq').directive('board', function($window) {
    return {
        scope: {
            modules: '='
        },
        controller: function($scope) {
            $scope.modules = $scope.modules || [];
            return {
                setModule: function(module) {
                    $scope.modules[module.name] = module;
                },
                getModule: function(moduleName) {
                    return $scope.modules[moduleName];
                }
            };
        },
        link: function(scope, element, attr) {
            scope.modules = [];
        }
    };
});
