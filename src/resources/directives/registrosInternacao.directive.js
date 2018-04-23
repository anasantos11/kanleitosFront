app.directive('listaRegistrosInternacao', function () {
    return {
        templateUrl: "templates/directives/registrosInternacao.html",
        scope: {
            registros: "=",
            ocultaLegenda: "=",
            showAcoes: "="
        },
        link: function (scope, element, attrs) {

            scope.closeModal = function(registro){
                scope.$parent.closeThisDialog(registro);
            }
        }
    };
});
