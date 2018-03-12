app.controller('registroInternacaoController', ["$scope", "$http", "$filter", "registroInternacaoFactory", "pedidoInternacaoFactory", "diagnosticosFactory", "alasFactory", "enfermariaFactory", "leitoFactory", "Notify",
    function ($scope, $http, $filter, registroInternacaoFactory, pedidoInternacaoFactory, diagnosticosFactory, alasFactory, enfermariaFactory, leitoFactory, Notify) {

        $scope.novoRegistroInternacao = function () {
            $scope.registroInternacao = {
                pedidoInternacao: {},
                idEnfermaria: null,
                idLeito: null,
                dataInternacao: new Date(),
                tempoPermanencia: 0,
                previsaoAlta: new Date(),
                idDiagnostico: -1,
                nomeDiagnostico: null,
                idAla: -1,
                nomeAla: null,
            }
        };

        $scope.novoRegistroInternacao();
        $scope.calcularPrevisaoAlta = function () {
            $scope.registroInternacao.previsaoAlta = new Date($scope.registroInternacao.dataInternacao);
            $scope.registroInternacao.previsaoAlta.setDate($scope.registroInternacao.previsaoAlta.getDate()
                + $scope.registroInternacao.pedidoInternacao.diagnostico.tempoPermanencia);
        };

        $scope.carregarLeitosEnfermaria = function (enfermaria) {
            leitoFactory.getLeitoEnfermaria(enfermaria)
                .then(function (response) {
                    $scope.Leitos = response.data.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.messages,
                            'error'
                        )
                    } else {
                        swal(
                            'Erro!',
                            'Ocorreu algum erro no servidor',
                            'error'
                        )
                    }
                });
        };

        $scope.openModalPesquisaPedidoInternacao = () => {
            return Notify.openModal("templates/relatorios/listaPedidoInternacao.html", null, "95%")
                .closePromise.then((pedidoInternacao) => {
                    if (!pedidoInternacao.value || pedidoInternacao.value === '$document' || pedidoInternacao.value === '$closeButton') {
                        return
                    } else {
                        debugger;
                        $scope.registroInternacao.pedidoInternacao = pedidoInternacao.value;
                        $scope.registroInternacao.pedidoInternacao.aih = parseInt($scope.registroInternacao.pedidoInternacao.aih);
                        $scope.registroInternacao.pedidoInternacao.paciente.dataNascimento = new Date ($scope.registroInternacao.pedidoInternacao.paciente.dataNascimento);
                        $scope.registroInternacao.pedidoInternacao.dataAdmissao = new Date($scope.registroInternacao.pedidoInternacao.dataAdmissao);
                        $scope.registroInternacao.pedidoInternacao.dataPedido = new Date ($scope.registroInternacao.pedidoInternacao.dataPedido);
                        $scope.CarregarEnfermarias($scope.registroInternacao.pedidoInternacao.ala.idAla);
                        $scope.calcularPrevisaoAlta();
                    }
                })
        }

        $scope.CarregarEnfermarias = function (idAla) {
            enfermariaFactory.getEnfermariasByAlas(idAla)
                .then(function (response) {
                    $scope.Enfermarias = response.data.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.messages,
                            'error'
                        )
                    } else {
                        swal(
                            'Erro!',
                            'Ocorreu algum erro no servidor',
                            'error'
                        )
                    }
                });
        };
        $scope.CarregarLeitos = function () {
            leitoFactory.getLeitos()
                .then(function (response) {
                    $scope.Leitos = response.data.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.messages,
                            'error'
                        )
                    } else {
                        swal(
                            'Erro!',
                            'Ocorreu algum erro no servidor',
                            'error'
                        )
                    }
                });
        };

        $scope.GetPedido = function () {
            setTimeout(function () {
                pedidoInternacaoFactory.getPedido($scope.registroInternacao.numProntuario)
                    .then(function (response) {
                        var res = responde.data.data;
                        $scope.registroInternacao.idPedidoInternacao = res.idPedidoInternacao
                        $scope.registroInternacao.numProntuario = res.paciente.numProntuario
                        $scope.registroInternacao.AIH = parseInt(res.AIH)
                        $scope.registroInternacao.nomePaciente = res.paciente.nomePaciente
                        $scope.registroInternacao.nomeMae = res.paciente.nomeMae
                        $scope.registroInternacao.dataNascimento = new Date(getData(res.paciente.dataNascimento))
                        $scope.registroInternacao.idade = res.paciente.idade
                        $scope.registroInternacao.genero = res.paciente.genero
                        $scope.registroInternacao.dataAdmissao = new Date(getData(res.paciente.dataNascimento))
                        $scope.registroInternacao.medicoResponsavel = res.medicoResponsavel
                        $scope.registroInternacao.residenteResponsavel = res.residenteResponsavel
                        $scope.registroInternacao.nomeDiagnostico = res.diagnostico.descricaoDiagnostico
                        $scope.registroInternacao.nomeAla = res.ala.nomeAla
                    }, function (response) {
                        swal(
                            'Erro!',
                            'Pedido de Internação não encontrado',
                            'error'
                        )
                    });
            }, 2000);
        }
        $scope.salvarRegistroInternacao = function () {
            if ($scope.validarRegistroInternacao()) {
                $scope.registroInternacao.dataInternacao = moment($scope.registroInternacao.dataInternacao).format();
                $scope.registroInternacao.previsaoAlta = moment($scope.registroInternacao.previsaoAlta).format();

                $scope.registroInternacao.enfermaria = $scope.Enfermarias.filter(function(obj){
                  return (obj.idEnfermaria == $scope.registroInternacao.idEnfermaria)})[0];

                $scope.registroInternacao.leito = $scope.Leitos.filter(function(obj){
                    return (obj.idLeito == $scope.registroInternacao.idLeito)})[0];

                registroInternacaoFactory.saveRegistroInternacao($scope.registroInternacao)
                    .then(function (response) {
                        if (response.data.data > 0) {

                            swal('Concluído!',
                                'Internação realizada com sucesso',
                                'success'
                            )

                            $scope.novoRegistroInternacao();

                        } else {
                            $scope.registroInternacao.dataInternacao = new Date($scope.registroInternacao.dataInternacao);
                            $scope.registroInternacao.previsaoAlta = new Date($scope.registroInternacao.previsaoAlta);
                            swal('Erro!',
                                'Paciente já está internado!',
                                'error'
                            )
                            return;
                        }

                    })
                    .catch((response) => {
                        $scope.registroInternacao.dataInternacao = new Date($scope.registroInternacao.dataInternacao);
                        $scope.registroInternacao.previsaoAlta = new Date($scope.registroInternacao.previsaoAlta);
                        if (response.data != undefined) {
                            swal(
                                'Erro!',
                                response.data.messages,
                                'error'
                            )
                        } else {
                            swal(
                                'Erro!',
                                response.message,
                                'error'
                            )
                        }
                    }

                    );
            }
        }

        $scope.calcularIdade = function () {
            const nasc = new Date($scope.registroInternacao.dataNascimento)

            if ($scope.registroInternacao.dataNascimento && nasc.toLocaleDateString().length) {
                var idadeP = new Date() - new Date($scope.registroInternacao.dataNascimento).getTime();
                var idadeData = new Date(idadeP);
                var idade = idadeData.getUTCFullYear() - 1970;
                if (!isNaN(idade) && idade != undefined) {
                    $scope.registroInternacao.idade = idade;
                } else {
                    $scope.registroInternacao.idade = 0;
                }
            } else {
                $scope.registroInternacao.idade = null
            }

        }

        $scope.validarRegistroInternacao = function () {
            if ($scope.registroInternacao == undefined) {
                swal(
                    'Erro!',
                    'Pedido de Internação não encontrado!',
                    'error'
                )
                return;
            }
            if ($scope.registroInternacao.idPedidoInternacao <= 0) {
                swal(
                    'Erro!',
                    'Pedido de Internação não encontrado!',
                    'error'
                )
                return;
            }
            if ($scope.registroInternacao.idEnfermaria == undefined) {
                swal(
                    'Erro!',
                    'Escolha uma enfermaria!',
                    'error'
                )
                return;
            }
            if ($scope.registroInternacao.idLeito == undefined) {
                swal(
                    'Erro!',
                    'Escolha um leito!',
                    'error'
                )
                return;
            }
            if ($scope.registroInternacao.dataInternacao == "") {
                swal(
                    'Erro!',
                    'Digite a data de internação do paciente!',
                    'error'
                )
                return;
            }
            if ($scope.registroInternacao.previsaoAlta == "") {
                swal(
                    'Erro!',
                    'Digite a previsão de alta do paciente!',
                    'error'
                )
                return;
            }
            return true;
        };
    }]);
