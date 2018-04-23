app.directive('filtros', function (svcIsolamento, alasFactory, $rootScope) {
    return {
        templateUrl: "templates/directives/filtros.html",
        scope: {
            model: "=",
            evento: "=",
            ocultaStatus: "=ocultaStatus",
            isPedido: "=isPedido"
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
                    idEnfermaria: "",
                    idLeito: "",
                    medicoResponsavel: "",
                    residenteResponsavel: "",
                    idIsolamento: "",
                    nomePaciente: "",
                    numProntuario: null,
                    dataAdmissao: null,
                    previsaoAlta: null,
                    classificacao: "",
                    status: "Em Andamento"
                };
                if(scope.isPedido){
                    scope.model.status="Pendente";
                }
                setTimeout(function(res) {
                    scope.filtrarDados();
                }, 100);
            };

            scope.filtrarDados();

        }
    };
});

