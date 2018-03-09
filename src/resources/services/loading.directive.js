

function ifLoading($http) {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            scope.isLoading = isLoading;

            scope.$watch(scope.isLoading, toggleElement);

            ////////

            function toggleElement(loading) {
                if (loading) {
                    elem.show();
                } else {
                    elem.hide();
                }
            }

            function isLoading() {
                return $http.pendingRequests.length > 0;
            }
        }
    };
};

ifLoading.$inject = ['$http'];

app
    .directive('ifLoading', ifLoading);
