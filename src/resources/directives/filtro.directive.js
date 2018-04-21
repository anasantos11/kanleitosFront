app.directive('filtros', ['svcIsolamento', 'alasFactory', function (svcIsolamento, alasFactory) {
    return {
        templateUrl: "templates/filtros.html",
        scope: {
            dadosFiltros: "="
        },
        link: function (scope, element, attrs) {

            alasFactory.getAlas()
                .then(function (res) {
                    scope.Alas = res.data.data
                });

            svcIsolamento.getIsolamentos()
                .then(function (res) {
                    scope.Isolamentos = res.data.data;
                });
        }
    };
}]);

