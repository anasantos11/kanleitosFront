app.controller('pedidoInternacaoController', ["$scope", "$rootScope", "$http", "$filter", "pedidoInternacaoFactory", "diagnosticosFactory", "pacienteFactory", "alasFactory", "Notify",
    function ($scope, $rootScope, $http, $filter, pedidoInternacaoFactory, diagnosticosFactory, pacienteFactory, alasFactory, Notify) {

        $scope.novoPedidoInternacao = function () {
            $scope.pedidoInternacao = {
                numProntuario: "",
                nomePaciente: "",
                nomeMae: "",
                dataNascimento: "",
                idade: "",
                genero: null,
                AIH: "",
                dataPedido: new Date(),
                status: "Pendente",
                medicoResponsavel: "",
                residenteResponsavel: "",
                dataAdmissao: new Date()
            }
        };

        $scope.novoPedidoInternacao();


        $scope.openModalCadastro = () => {
            return Notify.openModal("templates/internacao/cadastroPaciente.html", null, "50%")
                .closePromise.then((pacienteCadastrado) => {
                    if (!pacienteCadastrado.value || pacienteCadastrado.value === '$document' || pacienteCadastrado.value === '$closeButton') {
                        return
                    } else {
                        $scope.pedidoInternacao.numProntuario = pacienteCadastrado.value.numProntuario
                        $scope.pedidoInternacao.nomePaciente = pacienteCadastrado.value.nomePaciente
                        $scope.pedidoInternacao.nomeMae = pacienteCadastrado.value.nomeMae
                        $scope.pedidoInternacao.dataNascimento = new Date(getData(pacienteCadastrado.value.dataNascimento))
                        $scope.pedidoInternacao.idade = pacienteCadastrado.value.idade
                        $scope.pedidoInternacao.genero = pacienteCadastrado.value.genero
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
                        $scope.pedidoInternacao.numProntuario = pacienteEscolhido.value.numProntuario
                        $scope.pedidoInternacao.nomePaciente = pacienteEscolhido.value.nomePaciente
                        $scope.pedidoInternacao.nomeMae = pacienteEscolhido.value.nomeMae
                        $scope.pedidoInternacao.dataNascimento = new Date(getData(pacienteEscolhido.value.dataNascimento))
                        $scope.pedidoInternacao.idade = pacienteEscolhido.value.idade
                        $scope.pedidoInternacao.genero = pacienteEscolhido.value.genero
                    }

                })
        }

        $scope.Inicializar = function () {
            $scope.CarregarDiagnosticos();
            $scope.CarregarAlas();
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

        $scope.GetPaciente = function () {
            setTimeout(function () {
                pacienteFactory.getPaciente($scope.pedidoInternacao.numProntuario, $scope.pedidoInternacao.nomeMae)
                    .then(function (response) {
                        if (response.data.length > 0) {
                            $scope.pedidoInternacao.nomePaciente = response.data[0].nomePaciente;
                            $scope.pedidoInternacao.nomeMae = response.data[0].nomeMae;
                            $scope.pedidoInternacao.idade = response.data[0].idade;
                            $scope.pedidoInternacao.dataNascimento = new Date(getData(response.data[0].dataNascimento));
                            $scope.pedidoInternacao.genero = response.data[0].genero;
                        }
                    });
            }, 1000);
        }

        const getData = (dataDesformatada) => {
            const splitedDate = dataDesformatada.split("-")
            return "" + splitedDate[1] + "/" + splitedDate[2] + "/" + splitedDate[0];
        }

        $scope.Inicializar();

        $scope.salvarPedidoInternacao = function () {
            if ($scope.validarDadosPedidoInternacao()) {
                $scope.pedidoInternacao.dataAdmissao = $filter('date')($scope.pedidoInternacao.dataAdmissao, 'yyyy-MM-dd HH:mm:ss');
                $scope.pedidoInternacao.dataPedido = $filter('date')($scope.pedidoInternacao.dataPedido, 'yyyy-MM-dd HH:mm:ss');

                pedidoInternacaoFactory.savePedidoInternacao($scope.pedidoInternacao)
                    .then(function (response) {
                        if (!response.data.erro) {

                            swal('Concluído!',
                                'Pedido realizado com sucesso - nº: ' + response.data.idPedidoInternacao,
                                'success'
                            )

                            $scope.novoPedidoInternacao();
                        } else {
                            $scope.pedidoInternacao.dataNascimento = new Date($scope.pedidoInternacao.dataNascimento);
                            $scope.pedidoInternacao.dataPedido = new Date($scope.pedidoInternacao.dataPedido);
                            $scope.pedidoInternacao.dataAdmissao = new Date($scope.pedidoInternacao.dataAdmissao);
                            swal('Erro!',
                                'Paciente possui pedido em aberto!',
                                'error'
                            )
                            return;
                        }

                    })
                    .catch((response) => {
                        $scope.pedidoInternacao.dataNascimento = new Date($scope.pedidoInternacao.dataNascimento);
                        $scope.pedidoInternacao.dataPedido = new Date($scope.pedidoInternacao.dataPedido);
                        $scope.pedidoInternacao.dataAdmissao = new Date($scope.pedidoInternacao.dataAdmissao);
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
        $scope.validarDadosPedidoInternacao = function () {
            if ($scope.pedidoInternacao.numProntuario <= 0) {
                swal(
                    'Erro!',
                    'Digite o número do prontuário!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.AIH == "") {
                swal(
                    'Erro!',
                    'Digite o número do AIH!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.idDiagnostico == undefined) {
                swal(
                    'Erro!',
                    'Selecione um diagnóstico!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.idAla == undefined) {
                swal(
                    'Erro!',
                    'Selecione uma Ala!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.dataAdmissao == "") {
                swal(
                    'Erro!',
                    'Insira a data de admissão!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.medicoResponsavel == "" && $scope.pedidoInternacao.residenteResponsavel == "") {
                swal(
                    'Erro!',
                    'Deve informar ao menos um responsável',
                    'error'
                )
                return;
            }
            return true;
        }

        $scope.calcularIdade = function () {
            var idadeP = new Date() - new Date($scope.pedidoInternacao.dataNascimento).getTime();

            var idadeData = new Date(idadeP);
            var idade = idadeData.getUTCFullYear() - 1970;
            if (!isNaN(idade) && idade != undefined) {
                $scope.pedidoInternacao.idade = idade;
            } else {
                $scope.pedidoInternacao.idade = 0;
            }
        }
    }
]);
