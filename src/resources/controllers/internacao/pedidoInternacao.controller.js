app.controller('pedidoInternacaoController',
    function ($scope, $rootScope, $http, $filter, pedidoInternacaoFactory, pacienteFactory, alasFactory, Notify, svcIsolamento, svcFuncionario) {

        $scope.novoPedidoInternacao = function () {
            $scope.pedidoInternacao = {
                paciente: {
                    numProntuario: "",
                    nomePaciente: "",
                    nomeMae: "",
                    dataNascimento: null,
                    idade: "",
                    genero: null,
                },
                aih: "",
                status: "Pendente",
                medicoResponsavel: null,
                residenteResponsavel: null,
                dataAdmissao: new Date(new Date(new Date().setSeconds(0)).setMilliseconds(0))
            }
        };

        $scope.novoPedidoInternacao();


        $scope.openModalCadastro = () => {
            return Notify.openModal("templates/internacao/cadastroPaciente.html", null, "50%")
                .closePromise.then((pacienteCadastrado) => {
                    if (!pacienteCadastrado.value || pacienteCadastrado.value === '$document' || pacienteCadastrado.value === '$closeButton') {
                        return
                    } else {
                        $scope.pedidoInternacao.paciente.numProntuario = pacienteCadastrado.value.numProntuario
                        $scope.pedidoInternacao.paciente.nomePaciente = pacienteCadastrado.value.nomePaciente
                        $scope.pedidoInternacao.paciente.nomeMae = pacienteCadastrado.value.nomeMae
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date(pacienteCadastrado.value.dataNascimento)
                        $scope.pedidoInternacao.paciente.idade = pacienteCadastrado.value.idade
                        $scope.pedidoInternacao.paciente.genero = pacienteCadastrado.value.genero
                    }
                })
        }

        $scope.openModalPesquisa = () => {
            return Notify.openModal("templates/relatorios/listaPacientes.html", null, "95%")
                .closePromise.then((pacienteEscolhido) => {
                    console.log(pacienteEscolhido)
                    if (!pacienteEscolhido.value || pacienteEscolhido.value === '$document' || pacienteEscolhido.value === '$closeButton') {
                        return
                    } else {
                        $scope.pedidoInternacao.paciente.numProntuario = pacienteEscolhido.value.numProntuario
                        $scope.pedidoInternacao.paciente.nomePaciente = pacienteEscolhido.value.nomePaciente
                        $scope.pedidoInternacao.paciente.nomeMae = pacienteEscolhido.value.nomeMae
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date(pacienteEscolhido.value.dataNascimento)
                        $scope.pedidoInternacao.paciente.idade = pacienteEscolhido.value.idade
                        $scope.pedidoInternacao.paciente.genero = pacienteEscolhido.value.genero
                    }

                })
        }

        $scope.Inicializar = function () {
            $scope.CarregarAlas();
            $scope.carregarIsolamentos();
            $scope.carregarMedicos();
            $scope.carregarFuncionariosNaoMedicos();
        }

        $scope.CarregarAlas = function () {
            alasFactory.getAlas(true)
                .then(function (response) {
                    $scope.Alas = response.data.data;
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

        $scope.carregarIsolamentos = function () {
            svcIsolamento.getIsolamentos()
                .then(function (res) {
                    $scope.Isolamentos = res.data.data;
                })
        };

        $scope.GetPaciente = function () {
            setTimeout(function () {
                pacienteFactory.getPaciente($scope.pedidoInternacao.paciente.numProntuario, $scope.pedidoInternacao.paciente.nomeMae)
                    .then(function (response) {
                        $scope.pedidoInternacao.paciente = response.data.data;
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date($scope.pedidoInternacao.paciente.dataNascimento);

                    });
            }, 1000);
        };

        $scope.carregarMedicos = function () {
            svcFuncionario.getMedicos().then(function (res) {
                $scope.medicos = res.data.data;
            })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.carregarFuncionariosNaoMedicos = function () {
            svcFuncionario.getfuncionariosNaoMedicos().then(function (res) {
                $scope.outrosFuncionarios = res.data.data;
            })
                .catch(function (err) {
                    console.log(err);
                });
        }

        $scope.Inicializar();

        $scope.salvarPedidoInternacao = function () {
            if ($scope.validarDadosPedidoInternacao()) {
                $scope.pedidoInternacao.paciente.dataNascimento = moment($scope.pedidoInternacao.paciente.dataNascimento).format();
                $scope.pedidoInternacao.dataAdmissao = moment($scope.pedidoInternacao.dataAdmissao).format();
                $scope.pedidoInternacao.ala = $scope.Alas.filter(function (obj) {
                    return (obj.idAla == $scope.pedidoInternacao.idAla)
                })[0];

                if ($scope.pedidoInternacao.precisaIsolamento) {
                    $scope.pedidoInternacao.isolamento = $scope.Isolamentos.filter(function (obj) {
                        return (obj.idIsolamento == $scope.pedidoInternacao.idIsolamento)
                    })[0];
                }

                pedidoInternacaoFactory.savePedidoInternacao($scope.pedidoInternacao)
                    .then(function (response) {
                        alertaSucesso("Pedido de internação realizado com sucesso.")
                        $scope.novoPedidoInternacao();
                    })
                    .catch(function (err) {
                        alertaErroRequisicao(err);
                    });
            }
        }
        $scope.validarDadosPedidoInternacao = function () {
            if ($scope.pedidoInternacao.paciente.numProntuario <= 0) {
                alertaPreenchimentoCampo("número do prontuário");
                return;
            }
            if (isNullOrEmpty($scope.pedidoInternacao.aih)) {
                alertaPreenchimentoCampo("aih");
                return;
            }
            if (isNullOrEmpty($scope.pedidoInternacao.idAla)) {
                alertaPreenchimentoCampo("ala");
                return;
            }

            if (isNullOrEmpty($scope.pedidoInternacao.dataAdmissao)) {
                alertaPreenchimentoCampo("data de admissão");
                return;
            }
            if (isNullOrEmpty($scope.pedidoInternacao.medicoResponsavel)) {
                alertaPreenchimentoCampo("médico responsável");
                return;
            }

            if (isNullOrEmpty($scope.pedidoInternacao.residenteResponsavel)) {
                alertaPreenchimentoCampo("residente responsável");
                return;
            }

            if ($scope.pedidoInternacao.precisaIsolamento && isNullOrEmpty($scope.pedidoInternacao.idIsolamento)) {
                alertaPreenchimentoCampo("isolamento");
                return;
            }

            return true;
        }

        $scope.calcularIdade = function () {
            var idadeP = new Date() - new Date($scope.pedidoInternacao.paciente.dataNascimento).getTime();

            var idadeData = new Date(idadeP);
            var idade = idadeData.getUTCFullYear() - 1970;
            if (!isNaN(idade) && idade != undefined) {
                $scope.pedidoInternacao.idade = idade;
            } else {
                $scope.pedidoInternacao.idade = 0;
            }
        }
    }
);
