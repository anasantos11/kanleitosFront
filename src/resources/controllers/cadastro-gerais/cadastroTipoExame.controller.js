app.controller('CadastroExameController', ["$scope", "$http", "svcExame", "Notify",
    function ($scope, $http, svcExame, Notify) {

        $scope.title = "Cadastrar Exame";
        $scope.Exame = {
            nome: null,
            statusLeito: null
        }

        $scope.cadastrarExame = function (exame) {
            if ($scope.validarDadosExame()) {
                svcExame.cadastrarExame($scope.exame)
                    .then(function (response) {
                        alertaSucesso("Tipo de exame cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.exame);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.updateExame = function () {
            if ($scope.validarDadosExame()) {
                svcExame.updateExame($scope.exame, $scope.exame.idExame)
                    .then(function (response) {
                        alertaSucesso("Tipo de Exame atualizado com sucesso");
                        return $scope.closeThisDialog($scope.exame);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.validarDadosExame = function () {
            if (isNullOrEmpty($scope.exame.nome)) {
                alertaPreenchimentoCampo("nome do tipo de exame");
                return;
            }

            return true;
        };

        if (!isNullOrEmpty($scope.ngDialogData.exame)) {
            $scope.title = "Editar Exame:" + $scope.ngDialogData.exame.nome;
            $scope.exame = $scope.ngDialogData.exame;
        }
    }
]);
