app.controller('registroInternacaoController', ["$scope", "$http", "$filter", "registroInternacaoFactory", "pedidoInternacaoFactory", "alasFactory", "enfermariaFactory", "leitoFactory", "svcIsolamento", "Notify",
    function ($scope, $http, $filter, registroInternacaoFactory, pedidoInternacaoFactory, alasFactory, enfermariaFactory, leitoFactory, svcIsolamento, Notify) {

        $scope.novoRegistroInternacao = function () {
            $scope.registroInternacao = {
                pedidoInternacao: {},
                idEnfermaria: null,
                idLeito: null,
                tempoPermanencia: 0,
                previsaoAlta: new Date(),
            };
            $scope.mensagemIsolamentos = "";
            document.getElementById("mensagemIsolamentos").innerHTML = $scope.mensagemIsolamentos;
        };

        $scope.novoRegistroInternacao();

        $scope.carregarLeitosEnfermaria = function (enfermaria) {
            leitoFactory.getLeitoEnfermaria(enfermaria, true)
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
            return Notify.openModal("templates/relatorios/listaPedidosInternacaoAbertos.html", null, "95%")
                .closePromise.then((pedidoInternacao) => {
                    if (!pedidoInternacao.value || pedidoInternacao.value === '$document' || pedidoInternacao.value === '$closeButton') {
                        return
                    } else {
                        $scope.registroInternacao.pedidoInternacao = pedidoInternacao.value;
                        $scope.registroInternacao.pedidoInternacao.aih = parseInt($scope.registroInternacao.pedidoInternacao.aih);
                        $scope.registroInternacao.pedidoInternacao.paciente.dataNascimento = new Date($scope.registroInternacao.pedidoInternacao.paciente.dataNascimento);
                        $scope.registroInternacao.pedidoInternacao.dataAdmissao = new Date($scope.registroInternacao.pedidoInternacao.dataAdmissao);
                        $scope.CarregarEnfermarias($scope.registroInternacao.pedidoInternacao.ala.idAla);
                    }
                })
        }

        $scope.CarregarEnfermarias = function (idAla) {
            enfermariaFactory.getEnfermariasByAlas(idAla, true)
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
            leitoFactory.getLeitos(true)
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
                pedidoInternacaoFactory.getPedido($scope.registroInternacao.pedidoInternacao.paciente.numProntuario)
                    .then(function (response) {
                        $scope.registroInternacao.pedidoInternacao = response.data.data;
                        $scope.registroInternacao.pedidoInternacao.aih = parseInt($scope.registroInternacao.pedidoInternacao.aih);
                        $scope.registroInternacao.pedidoInternacao.paciente.dataNascimento = new Date($scope.registroInternacao.pedidoInternacao.paciente.dataNascimento);
                        $scope.registroInternacao.pedidoInternacao.dataAdmissao = new Date($scope.registroInternacao.pedidoInternacao.dataAdmissao);
                        $scope.CarregarEnfermarias($scope.registroInternacao.pedidoInternacao.ala.idAla);
                    }, function (response) {
                        swal(
                            'Erro!',
                            'Pedido de Internação não encontrado',
                            'error'
                        )
                    });
            }, 2000);
        };

        $scope.verificarIsolamentos = function (idEnfermaria) {
            svcIsolamento.getIsolamentosByEnfermaria(idEnfermaria)
                .then(function (res) {
                   var listaIsolamentos = res.data.data;
                   document.getElementById("mensagemIsolamentos").innerHTML = "";
                   
                    if (listaIsolamentos.length > 0) {
                        var enf = $scope.Enfermarias.filter(function (obj) {
                            return (obj.idEnfermaria == idEnfermaria);
                        })[0];

                        $scope.mensagemIsolamentos = "Existem pacientes internados na <strong>" + enf.ala.nomeAla + " enfermaria " +
                        enf.nomeEnfermaria.toUpperCase() + "</strong> com os seguintes tipos de isolamentos: " +
                        "<strong class='text-danger'> " + listaIsolamentos.join(", ").toLowerCase() + "</strong>";

                        document.getElementById("mensagemIsolamentos").innerHTML =  $scope.mensagemIsolamentos;
                        alertaInformacao( $scope.mensagemIsolamentos);
                    }

                })
        };

        $scope.salvarRegistroInternacao = function () {
            if ($scope.validarRegistroInternacao()) {
                $scope.registroInternacao.previsaoAlta = moment($scope.registroInternacao.previsaoAlta).format();

                $scope.registroInternacao.enfermaria = $scope.Enfermarias.filter(function (obj) {
                    return (obj.idEnfermaria == $scope.registroInternacao.idEnfermaria)
                })[0];

                $scope.registroInternacao.leito = $scope.Leitos.filter(function (obj) {
                    return (obj.idLeito == $scope.registroInternacao.idLeito)
                })[0];

                registroInternacaoFactory.saveRegistroInternacao($scope.registroInternacao)
                    .then(function (response) {
                        if (response.data.data > 0) {

                            swal('Concluído!',
                                'Internação realizada com sucesso',
                                'success'
                            )

                            $scope.novoRegistroInternacao();

                        } else {
                            $scope.registroInternacao.previsaoAlta = new Date($scope.registroInternacao.previsaoAlta);
                            swal('Erro!',
                                'Paciente já está internado!',
                                'error'
                            )
                            return;
                        }

                    })
                    .catch((response) => {
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
        };

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
            if ($scope.registroInternacao.pedidoInternacao == undefined || $scope.registroInternacao.pedidoInternacao.idPedidoInternacao <= 0) {
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
