app.directive('listaRegistrosInternacao', function () {
    return {
        templateUrl: "templates/directives/registrosInternacao.html",
        scope: {
            registros: "=",
            ocultaLegenda: "=",
            showAcoes: "=",
            dadosFiltros: "=",
            evento: "=",
            ocultaStatus: "=ocultaStatus",
        },
        link: function (scope, element, attrs) {

            scope.closeModal = function (registro) {
                scope.$parent.closeThisDialog(registro);
            }

        }
    };
});
