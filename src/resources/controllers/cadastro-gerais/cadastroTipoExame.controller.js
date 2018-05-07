app.controller('CadastroTipoExameController', ["$scope", "$http", "svcTipoExame", "Notify",
    function ($scope, $http, svcTipoExame, Notify) {

        $scope.title = "Cadastrar Tipo Exame";
        $scope.tipoExame = {
            nome: null,
            statusLeito: null
        }

        $scope.cadastrarTipoExame = function (tipoExame) {
            if ($scope.validarDadosExame()) {
                svcTipoExame.cadastrarTipoExame($scope.tipoExame)
                    .then(function (response) {
                        alertaSucesso("Tipo de exame cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.tipoExame);
                    })
                    .catch(function (err) {
                        alertaErroRequisicao(err);
                    })
            }
        };

        $scope.updateTipoExame = function () {
            if ($scope.validarDadosExame()) {
                svcTipoExame.updateTipoExame($scope.tipoExame, $scope.tipoExame.tipoExameId)
                    .then(function (response) {
                        alertaSucesso("Tipo de exame atualizado com sucesso");
                        return $scope.closeThisDialog($scope.tipoExame);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.validarDadosExame = function () {
            if (isNullOrEmpty($scope.tipoExame.nome)) {
                alertaPreenchimentoCampo("nome do tipo de exame");
                return;
            }
            return true;
        };

        if (!isNullOrEmpty($scope.ngDialogData.tipoExame)) {
            $scope.title = "Editar Exame:" + $scope.ngDialogData.tipoExame.nome;
            $scope.tipoExame = $scope.ngDialogData.tipoExame;
        }
    }
]);
