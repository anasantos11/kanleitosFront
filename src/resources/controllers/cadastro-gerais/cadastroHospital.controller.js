app.controller('CadastroHospitalController', ["$scope", "$http", "$filter", "svcHospital", "Notify",
    function ($scope, $http, $filter, svcHospital, Notify) {

        $scope.hospital = {
            nome: null,
            endereco: null,
            telefone: null,
            especialidade: null,
            inativo: false,
        }

        $scope.cadastrarHospital = function (hospital) {
            if ($scope.validarDadosHospital()) {
                svcHospital.cadastrarHospital($scope.hospital)
                    .then(function (response) {
                        if (response.data.data > 0) {
                            swal('Concluído!',
                                'Hospital cadastrado com sucesso',
                                'success'
                            )
                            return $scope.closeThisDialog($scope.hospital);
                        } else {
                            swal('Erro!',
                                response.data.messages[0],
                                'error'
                            )
                            return;
                        }

                    })
                    .catch(function (response) {
                        if (response.status == 400) {
                            swal(
                                "Erro!",
                                response.data.messages[0],
                                "error"
                            )
                        } else {
                            console.log(response.data.message);
                            swal(
                                "Erro!",
                                "Desculpe, não conseguimos processar sua solicitação. Verifique os dados e tente novamente.",
                                "error"
                            )
                        }
                    })
            }
        }

        $scope.validarDadosHospital = function () {
            if (isNullOrEmpty($scope.hospital.nome)) {
                alertaPreenchimentoCampo("nome do hospital");
                return;
            }

            if (!isNullOrEmpty($scope.enderecoSeparado) && (!isNullOrEmpty($scope.enderecoSeparado.cep) ||
                !isNullOrEmpty($scope.enderecoSeparado.tipoLogradouro) || !isNullOrEmpty($scope.enderecoSeparado.rua) ||
                !isNullOrEmpty($scope.enderecoSeparado.numero) || !isNullOrEmpty($scope.enderecoSeparado.bairro) ||
                !isNullOrEmpty($scope.enderecoSeparado.cidade) || !isNullOrEmpty($scope.enderecoSeparado.estado))) {

                if (isNullOrEmpty($scope.enderecoSeparado.cep)) {
                    alertaPreenchimentoCampo("cep");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.tipoLogradouro)) {
                    alertaPreenchimentoCampo("tipo de logradouro");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.rua)) {
                    alertaPreenchimentoCampo("rua");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.numero)) {
                    alertaPreenchimentoCampo("número do endereço");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.bairro)) {
                    alertaPreenchimentoCampo("bairro");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.bairro)) {
                    alertaPreenchimentoCampo("cidade");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.estado)) {
                    alertaPreenchimentoCampo("estado");
                    return;
                }
                if (isNullOrEmpty($scope.enderecoSeparado.cidade)) {
                    alertaPreenchimentoCampo("cidade");
                    return;
                }
                $scope.concatenarEndereco();
            }

            return true;
        };

        $scope.concatenarEndereco = function () {
            $scope.hospital.endereco = $scope.enderecoSeparado.tipoLogradouro + " " + $scope.enderecoSeparado.rua + ", " +
                $scope.enderecoSeparado.numero + " - " + $scope.enderecoSeparado.bairro + ", " + $scope.enderecoSeparado.cidade + " - " +
                $scope.enderecoSeparado.estado + ", " + $scope.enderecoSeparado.cep;
        }
    }
]);
