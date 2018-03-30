app.controller('CadastroHospitalController', ["$scope", "$http", "$filter", "svcHospital", "Notify",
    function ($scope, $http, $filter, svcHospital, Notify) {

        $scope.enderecoCompleto = false;
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
                        alertaSucesso("Hospital cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.hospital);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
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

        if (!isNullOrEmpty($scope.ngDialogData.hospital)) {
            $scope.enderecoCompleto = true;
            if (!isNullOrEmpty($scope.ngDialogData.hospital.telefone)) {
                $scope.ngDialogData.hospital.telefone = parseInt($scope.ngDialogData.hospital.telefone);
            }
            $scope.hospital = $scope.ngDialogData.hospital;
            $scope.copia = angular.copy($scope.hospital);
        }

        $scope.cancelar = function () {
            $scope.hospital = $scope.copia;
        }
    }
]);
