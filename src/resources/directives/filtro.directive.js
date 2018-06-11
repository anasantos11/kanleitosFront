app.directive('filtros', function (svcIsolamento, alasFactory, svcFuncionario, enfermariaFactory, leitoFactory, $rootScope) {
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

            svcFuncionario.getMedicos()
                .then(function (res) {
                    scope.medicos = res.data.data;
                })

            svcFuncionario.getfuncionariosNaoMedicos().then(function (res) {
                scope.outrosFuncionarios = res.data.data;
            })

            scope.carregarEnfermarias = function () {
                enfermariaFactory.getEnfermariasByAlas(scope.model.ala.idAla, false)
                    .then(function (res) {
                    scope.enfermarias = res.data.data;
                    });
            };

            scope.carregarLeitosEnfermaria = function () {
                leitoFactory.getLeitoEnfermaria(scope.model.idEnfermaria, false)
                    .then(function (response) {
                        scope.leitos = response.data.data;
                    });
            };

            svcIsolamento.getIsolamentos()
                .then(function (res) {
                    scope.Isolamentos = res.data.data;
                });

            scope.filtrarDados = function () {
                debugger;
                scope.model.idAla = isNullOrEmpty(scope.model.ala) ? "" : scope.model.ala.idAla;
                scope.model.idMedico = isNullOrEmpty(scope.model.medicoResponsavel) ? "" : scope.model.medicoResponsavel.idFuncionario;
                scope.model.idResidente = isNullOrEmpty(scope.model.residenteResponsavel) ? "" : scope.model.residenteResponsavel.idFuncionario;
                $rootScope.$broadcast(scope.evento);
            };

            scope.limparFiltros = function () {
                scope.model = {
                    idAla: "",
                    idEnfermaria: "",
                    idLeito: "",
                    idMedico: "",
                    idResidente: "",
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

