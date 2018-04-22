app.directive('filtros', function (svcIsolamento, alasFactory, $rootScope) {
    return {
        templateUrl: "templates/filtros.html",
        scope: {
            model: "=",
            evento: "="
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

            scope.filtrarDados = function () {
                $rootScope.$broadcast(scope.evento);
            };

            scope.limparFiltros = function () {
                scope.model = {
                    idAla: "",
                    medicoResponsavel: "",
                    residenteResponsavel: "",
                    idIsolamento: "",
                    nomePaciente: "",
                    numProntuario: null,
                    dataAdmissao: null,
                    classificacaoTempoEspera: "",
                    statusPedido: "PENDENTE"
                };
            };

            scope.filtrarDados();

        }
    };
});

