app.controller('CadastroFuncionarioController', ["$scope", "$http", "svcFuncionario", "Notify",
    function ($scope, $http, svcFuncionario, Notify) {

        $scope.title = "Cadastrar Funcionário";
        $scope.funcionario = {
            nome: "",
            especialidade: "",
            crm: null
        }

        $scope.cadastrarFuncionario = function () {
            if ($scope.validarFuncionario()) {
                svcFuncionario.cadastrarFuncionario($scope.funcionario)
                    .then(function (response) {
                        alertaSucesso("Funcionário cadastrado com sucesso");
                        return $scope.closeThisDialog($scope.funcionario);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao();
                    })
            }
        };

        $scope.updateFuncionario = function () {
            if ($scope.validarFuncionario()) {
                svcFuncionario.updateFuncionario($scope.funcionario)
                    .then(function (response) {
                        alertaSucesso("Funcionário atualizado com sucesso");
                        return $scope.closeThisDialog($scope.funcionario);

                    })
                    .catch(function (response) {
                        alertaErroRequisicao(response);
                    })
            }
        };

        $scope.validarFuncionario = function () {
            if (isNullOrEmpty($scope.funcionario.nome)) {
                alertaPreenchimentoCampo("nome do funcionário");
                return;
            }

            if (isNullOrEmpty($scope.funcionario.especialidade)) {
                alertaPreenchimentoCampo("nome do funcionário");
                return;
            }

            return true;
        };

        if (!isNullOrEmpty($scope.ngDialogData.funcionario)) {
            $scope.title = "Editar Funcionário:" + $scope.ngDialogData.funcionario.nome;
            $scope.funcionario = $scope.ngDialogData.funcionario;
            $scope.funcionario.crm = parseFloat($scope.ngDialogData.funcionario.crm);
        }
    }
]);
