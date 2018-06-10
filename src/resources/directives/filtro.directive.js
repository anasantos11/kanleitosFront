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

            alasFactory.getAlas(false)
                .then(function (res) {
                    scope.alas = res.data.data;
                    if (!isNullOrEmpty(scope.model.idAla)) {
                        scope.model.ala = scope.alas.filter(function (obj) {
                            return (obj.idAla == scope.model.idAla)
                        })[0];
                    }
                });

            svcIsolamento.getIsolamentos()
                .then(function (res) {
                    scope.Isolamentos = res.data.data;
                });

            scope.filtrarDados = function () {
                scope.model.idAla = isNullOrEmpty(scope.model.ala) ? "" : scope.model.ala.idAla;
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
                if (scope.isPedido) {
                    scope.model.status = "Pendente";
                }
                setTimeout(function (res) {
                    scope.filtrarDados();
                }, 100);
            };

            scope.destacarTitulo = function () {
                var element = document.getElementById('tituloFiltros').style.background = "#d9dde08a";
            };

        }
    };
});

