app.controller('CadastroIsolamentoController', ["$scope", "$http", "svcIsolamento", "Notify",
    function ($scope, $http, svcIsolamento, Notify) {

        $scope.title = "Cadastrar Isolamento";
        $scope.isolamento = {
            nome: null,
            statusLeito: null
        }

        $scope.cadastrarIsolamento = function (isolamento) {
            if ($scope.validarDadosIsolamento()) {
                svcIsolamento.cadastrarIsolamento($scope.isolamento)
                    .then(function (response) {
                        alertaSucesso("Tipo de Isolamento cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.isolamento);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.updateIsolamento = function () {
            if ($scope.validarDadosIsolamento()) {
                svcIsolamento.updateIsolamento($scope.isolamento, $scope.isolamento.idIsolamento)
                    .then(function (response) {
                        alertaSucesso("Tipo de Isolamento atualizado com sucesso");
                        return $scope.closeThisDialog($scope.isolamento);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.validarDadosIsolamento = function () {
            if (isNullOrEmpty($scope.isolamento.nome)) {
                alertaPreenchimentoCampo("nome do tipo de isolamento");
                return;
            }

            return true;
        };

        if (!isNullOrEmpty($scope.ngDialogData.isolamento)) {
            $scope.title = "Editar Isolamento:" + $scope.ngDialogData.isolamento.nome;
            $scope.isolamento = $scope.ngDialogData.isolamento;
        }
    }
]);
