app.directive('listaRegistrosInternacao', function (Notify) {
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

            scope.openModalPendenciasInternacao = (registro) => {
                return Notify.openModal("templates/internacao/pendenciaInternacao.html", { idRegistroInternacao: registro.idRegistroInternacao }, "95%")
            };

        }
    };
});
