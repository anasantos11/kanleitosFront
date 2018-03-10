app.controller('pedidoInternacaoController', ["$scope", "$rootScope", "$http", "$filter", "pedidoInternacaoFactory", "diagnosticosFactory", "pacienteFactory", "alasFactory", "Notify",
    function ($scope, $rootScope, $http, $filter, pedidoInternacaoFactory, diagnosticosFactory, pacienteFactory, alasFactory, Notify) {

        $scope.novoPedidoInternacao = function () {
            $scope.pedidoInternacao = {
                paciente: {
                    numProntuario: "",
                    nomePaciente: "",
                    nomeMae: "",
                    dataNascimento: "",
                    idade: "",
                    genero: null,
                },
                aih: "",
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
                        $scope.pedidoInternacao.paciente.numProntuario = pacienteCadastrado.value.numProntuario
                        $scope.pedidoInternacao.paciente.nomePaciente = pacienteCadastrado.value.nomePaciente
                        $scope.pedidoInternacao.paciente.nomeMae = pacienteCadastrado.value.nomeMae
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date(getData(pacienteCadastrado.value.dataNascimento))
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
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date(getData(pacienteEscolhido.value.dataNascimento))
                        $scope.pedidoInternacao.paciente.idade = pacienteEscolhido.value.idade
                        $scope.pedidoInternacao.paciente.genero = pacienteEscolhido.value.genero
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
                    $scope.Diagnosticos = response.data.data;
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
        $scope.CarregarAlas = function () {
            alasFactory.getAlas()
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

        $scope.GetPaciente = function () {
            setTimeout(function () {
                pacienteFactory.getPaciente($scope.pedidoInternacao.paciente.numProntuario, $scope.pedidoInternacao.paciente.nomeMae)
                    .then(function (response) {
                        var res = response.data.data;
                        if (res.length > 0) {
                            $scope.pedidoInternacao.paciente.nomePaciente = res[0].nomePaciente;
                            $scope.pedidoInternacao.paciente.nomeMae = res[0].nomeMae;
                            $scope.pedidoInternacao.paciente.idade = res[0].idade;
                            $scope.pedidoInternacao.paciente.dataNascimento = new Date(getData(res[0].dataNascimento));
                            $scope.pedidoInternacao.paciente.genero = res[0].genero;
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

                $scope.pedidoInternacao.ala =  $scope.Alas.filter(function(obj) {
                    return (obj.idAla == $scope.pedidoInternacao.idAla)})[0];

                $scope.pedidoInternacao.diagnostico =  $scope.Diagnosticos.filter(function(obj) {
                    return (obj.idDiagnostico == $scope.pedidoInternacao.idDiagnostico)})[0];

                pedidoInternacaoFactory.savePedidoInternacao($scope.pedidoInternacao)
                    .then(function (response) {
                        if (response.data.data > 0) {

                            swal('Concluído!',
                                'Pedido realizado com sucesso',
                                'success'
                            )

                            $scope.novoPedidoInternacao();
                        } else {
                            $scope.pedidoInternacao.paciente.dataNascimento = new Date($scope.pedidoInternacao.paciente.dataNascimento);
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
                        $scope.pedidoInternacao.paciente.dataNascimento = new Date($scope.pedidoInternacao.paciente.dataNascimento);
                        $scope.pedidoInternacao.dataPedido = new Date($scope.pedidoInternacao.dataPedido);
                        $scope.pedidoInternacao.dataAdmissao = new Date($scope.pedidoInternacao.dataAdmissao);

                        if(response.status == 400){
                            swal(
                                "Erro!",
                                response.data.messages[0],
                                "error"
                            )
                        }else{
                            console.log(response.data.message);
                            swal(
                                "Erro!",
                                "Desculpe, não conseguimos processar sua solicitação. Verifique os dados e tente novamente.",
                                "error"
                            )
                        }

                    }

                    );
            }
        }
        $scope.validarDadosPedidoInternacao = function () {
            if ($scope.pedidoInternacao.paciente.numProntuario <= 0) {
                swal(
                    'Erro!',
                    'Digite o número do prontuário!',
                    'error'
                )
                return;
            }
            if ($scope.pedidoInternacao.aih == "") {
                swal(
                    'Erro!',
                    'Digite o número do aih!',
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
]);
