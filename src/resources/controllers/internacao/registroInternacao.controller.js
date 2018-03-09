app.controller('registroInternacaoController', ["$scope", "$http", "$filter", "registroInternacaoFactory", "pedidoInternacaoFactory", "diagnosticosFactory", "alasFactory", "enfermariaFactory", "leitoFactory", "Notify",
    function ($scope, $http, $filter, registroInternacaoFactory, pedidoInternacaoFactory, diagnosticosFactory, alasFactory, enfermariaFactory, leitoFactory, Notify) {

        $scope.novoRegistroInternacao = function () {
            $scope.registroInternacao = {
                numProntuario: null,
                AIH: "",
                nomePaciente: "",
                nomeMae: "",
                dataNascimento: "",
                idade: null,
                genero: "",
                dataAdmissao: "",
                medicoResponsavel: "",
                residenteResponsavel: "",
                dataInternacao: new Date(),
                idDiagnostico: -1,
                nomeDiagnostico: null,
                tempoPermanencia: 0,
                idAla: -1,
                nomeAla: null,
                previsaoAlta: "",
                idPedidoInternacao: null,
                dataPedido: ""
            }
        };

        $scope.novoRegistroInternacao();
        $scope.calcularPrevisaoAlta = function () {
            $scope.registroInternacao.previsaoAlta = new Date($scope.registroInternacao.dataInternacao);
            $scope.registroInternacao.previsaoAlta.setDate($scope.registroInternacao.previsaoAlta.getDate()
                + $scope.registroInternacao.tempoPermanencia);
        };
        $scope.Inicializar = function () {
            $scope.CarregarDiagnosticos();
            $scope.CarregarAlas();

        }

        $scope.carregarLeitosEnfermaria = function (enfermaria) {
            leitoFactory.getLeitoEnfermaria(enfermaria)
                .then(function (response) {
                    $scope.Leitos = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
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

        const getData = (dataDesformatada) => {
            const splitedDate = dataDesformatada.split("-")
            return "" + splitedDate[1] + "/" + splitedDate[2] + "/" + splitedDate[0];
        }

        const getDataAdmimissao = (dataAdmissao) => {
            const splitedDate = getData(dataAdmissao.split(" ")[0])
            return splitedDate;
        }

        $scope.openModalPesquisaPedidoInternacao = () => {
            return Notify.openModal("templates/relatorios/listaPedidoInternacao.html", null, "95%")
                .closePromise.then((pedidoInternacao) => {
                    if (!pedidoInternacao.value || pedidoInternacao.value === '$document' || pedidoInternacao.value === '$closeButton') {
                        return
                    } else {
                        $scope.registroInternacao.idPedidoInternacao = pedidoInternacao.value.idPedidoInternacao;
                        $scope.registroInternacao.numProntuario = pedidoInternacao.value.paciente.numProntuario;
                        $scope.registroInternacao.dataPedido = new Date(pedidoInternacao.value.dataPedido);
                        $scope.registroInternacao.AIH = parseInt(pedidoInternacao.value.AIH);
                        $scope.registroInternacao.nomePaciente = pedidoInternacao.value.paciente.nomePaciente;
                        $scope.registroInternacao.nomeMae = pedidoInternacao.value.paciente.nomeMae;
                        $scope.registroInternacao.dataNascimento = new Date(getData(pedidoInternacao.value.paciente.dataNascimento));
                        $scope.registroInternacao.idade = pedidoInternacao.value.paciente.idade;
                        $scope.registroInternacao.genero = pedidoInternacao.value.paciente.genero;
                        $scope.registroInternacao.dataAdmissao = new Date(getDataAdmimissao(pedidoInternacao.value.dataAdmissao));
                        $scope.registroInternacao.idDiagnostico = pedidoInternacao.value.diagnostico.idDiagnostico;
                        $scope.registroInternacao.nomeDiagnostico = pedidoInternacao.value.diagnostico.descricaoDiagnostico;
                        $scope.registroInternacao.tempoPermanencia = pedidoInternacao.value.diagnostico.tempoPermanencia;
                        $scope.registroInternacao.idAla = pedidoInternacao.value.ala.idAla;
                        $scope.registroInternacao.nomeAla = pedidoInternacao.value.ala.nomeAla;
                        $scope.registroInternacao.medicoResponsavel = pedidoInternacao.value.medicoResponsavel;
                        $scope.registroInternacao.residenteResponsavel = pedidoInternacao.value.residenteResponsavel;


                        $scope.CarregarEnfermarias($scope.registroInternacao.idAla);
                        $scope.calcularPrevisaoAlta();
                    }
                })
        }

        $scope.CarregarDiagnosticos = function () {
            diagnosticosFactory.getDiagnosticos()
                .then(function (response) {
                    $scope.Diagnosticos = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
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
        $scope.CarregarAlas = function () {
            alasFactory.getAlas()
                .then(function (response) {
                    $scope.Alas = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
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
        $scope.CarregarEnfermarias = function (idAla) {
            enfermariaFactory.getEnfermariasByAlas(idAla)
                .then(function (response) {
                    $scope.Enfermarias = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
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
                    $scope.Leitos = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
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
        $scope.Inicializar();

        $scope.GetPedido = function () {
            setTimeout(function () {
                pedidoInternacaoFactory.getPedido($scope.registroInternacao.numProntuario)
                    .then(function (response) {
                        $scope.registroInternacao.idPedidoInternacao = response.data.idPedidoInternacao
                        $scope.registroInternacao.numProntuario = response.data.paciente.numProntuario
                        $scope.registroInternacao.AIH = parseInt(response.data.AIH)
                        $scope.registroInternacao.nomePaciente = response.data.paciente.nomePaciente
                        $scope.registroInternacao.nomeMae = response.data.paciente.nomeMae
                        $scope.registroInternacao.dataNascimento = new Date(getData(response.data.paciente.dataNascimento))
                        $scope.registroInternacao.idade = response.data.paciente.idade
                        $scope.registroInternacao.genero = response.data.paciente.genero
                        $scope.registroInternacao.dataAdmissao = new Date(getData(response.data.paciente.dataNascimento))
                        $scope.registroInternacao.medicoResponsavel = response.data.medicoResponsavel
                        $scope.registroInternacao.residenteResponsavel = response.data.residenteResponsavel
                        $scope.registroInternacao.nomeDiagnostico = response.data.diagnostico.descricaoDiagnostico
                        $scope.registroInternacao.nomeAla = response.data.ala.nomeAla
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
                $scope.registroInternacao.idPedido = $scope.registroInternacao.idPedidoInternacao;
                $scope.registroInternacao.dataInternacao = $filter('date')($scope.registroInternacao.dataInternacao, 'yyyy-MM-dd HH:mm:ss');
                $scope.registroInternacao.previsaoAlta = $filter('date')($scope.registroInternacao.previsaoAlta, 'yyyy-MM-dd HH:mm:ss');

                registroInternacaoFactory.saveRegistroInternacao($scope.registroInternacao)
                    .then(function (response) {
                        if (!response.data.erro) {

                            swal('Concluído!',
                                'Internação realizada com sucesso - nº: ' + response.data.idRegistroInternacao,
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
                                response.data.error + " " + response.data.message,
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
