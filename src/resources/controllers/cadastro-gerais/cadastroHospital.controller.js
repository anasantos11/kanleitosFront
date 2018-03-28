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
            if (!$scope.hospital.nome) {
                swal(
                    'Erro!',
                    'Digite o nome do hospital!',
                    'error'
                )
                return;
            }
            return true;
        }
    }
]);
