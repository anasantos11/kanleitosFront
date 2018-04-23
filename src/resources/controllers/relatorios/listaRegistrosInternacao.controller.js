app.controller('RegistrosInternacaoController', ['$rootScope', '$scope', '$state', '$stateParams', "$interval", "registroInternacaoFactory", "Notify",
    function ($rootScope, $scope, $state, $stateParams, $interval, registroInternacaoFactory, Notify) {

        $scope.kanban = {
            verde: {
                qtdPacientes: 0,
                pacientes: []
            },
            vermelho: {
                qtdPacientes: 0,
                pacientes: []
            },
            amarelo: {
                qtdPacientes: 0,
                pacientes: []
            }
        };

        $scope.evento = "filtrarRegistros";

        $scope.novoFiltro = function () {
            $scope.dadosFiltros = {
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
        };

        $scope.novoFiltro();
        $scope.canShowPacientes = false;

        $scope.openDadosPaciente = function (pacientes) {
            $state.go('classificacaoPacientes', { pacientes: pacientes });
        };

        $scope.atualizaPacientesInternados = function (pacientes) {
            $scope.canShowPacientes = false;
            var dataAtual = new Date();
            for (var i = 0; i < pacientes.length; i++) {
                var diasInternado = calcularDiasDiferenca(dataAtual, new Date(pacientes[i].dataInternacao)).dias;
                if (diasInternado < 6) {
                    pacientes[i].classificacao = "verde";
                    pacientes[i].diasInternado = diasInternado;
                    $scope.kanban.verde.qtdPacientes += 1;
                    $scope.kanban.verde.pacientes.push(pacientes[i]);
                } else if (diasInternado < 11) {
                    pacientes[i].classificacao = "amarelo";
                    pacientes[i].diasInternado = diasInternado;
                    $scope.kanban.amarelo.qtdPacientes += 1;
                    $scope.kanban.amarelo.pacientes.push(pacientes[i]);
                } else {
                    pacientes[i].classificacao = "vermelho";
                    pacientes[i].diasInternado = diasInternado;
                    $scope.kanban.vermelho.qtdPacientes += 1;
                    $scope.kanban.vermelho.pacientes.push(pacientes[i]);
                }
            }
            $scope.canShowPacientes = true;
        };

        $scope.carregarRegistros = function () {
            registroInternacaoFactory.getRegistrosInternacoes($scope.dadosFiltros)
                .then(function (res) {
                    $scope.listaRegistros = res.data.data;
                    $scope.atualizaPacientesInternados($scope.listaRegistros);
                })
                .catch(function (res) {
                    console.log(res.data);
                });
        };

        $rootScope.$on($scope.evento, function (event) {
            $scope.carregarRegistros();
        });

        $scope.carregarRegistros();
    }
])