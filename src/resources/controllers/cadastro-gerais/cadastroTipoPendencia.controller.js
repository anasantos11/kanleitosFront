app.controller('CadastroTipoPendenciaController', ["$scope", "$http", "svcTipoPendencia", "Notify",
    function ($scope, $http, svcTipoPendencia, Notify) {

        $scope.title = "Cadastrar Tipo Pendência";
        $scope.tipoPendencia = {
            nome: null
        }

        $scope.cadastrarTipoPendencia = function () {
            if ($scope.validarDadosTipoPendencia()) {
                svcTipoPendencia.cadastrarTipoPendencia($scope.tipoPendencia)
                    .then(function (response) {
                        alertaSucesso("Tipo de Pendência cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.tipoPendencia);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.updateTipoPendencia = function () {
            if ($scope.validarDadosTipoPendencia()) {
                svcTipoPendencia.updateTipoPendencia($scope.tipoPendencia)
                    .then(function (response) {
                        alertaSucesso("Tipo de Pendência atualizado com sucesso");
                        return $scope.closeThisDialog($scope.tipoPendencia);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao(response);
                    })
            }
        };

        $scope.validarDadosTipoPendencia = function () {
            if (isNullOrEmpty($scope.tipoPendencia.nome)) {
                alertaPreenchimentoCampo("nome do tipo de pendência");
                return;
            }

            return true;
        };

        if (!isNullOrEmpty($scope.ngDialogData.tipoPendencia)) {
            $scope.title = "Editar Tipo Pendência:" + $scope.ngDialogData.tipoPendencia.nome;
            $scope.tipoPendencia = $scope.ngDialogData.tipoPendencia;
        }
    }
]);
