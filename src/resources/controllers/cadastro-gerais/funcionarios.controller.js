app.controller('FuncionariosController', ['$scope', '$state', 'svcFuncionario', 'Notify', function ($scope, $state, svcFuncionario, Notify) {


    $scope.carregarFuncionarios = function () {
        svcFuncionario.getFuncionarios()
            .then(function (res) {
                $scope.listaFuncionarios = res.data.data;
            })
    };

    $scope.updateFuncionario = function (funcionario) {
        funcionario.atualizar = true;
        $scope.openModalFuncionario(funcionario);
    };

    $scope.openModalFuncionario = function (funcionario) {
        $scope.copia = angular.copy($scope.listaFuncionarios);
        return Notify.openModal("templates/cadastros-gerais/cadastroFuncionario.html", { funcionario: funcionario }, "50%")
            .closePromise.then(
                function (funcionarioCadastrado) {
                    if (!funcionarioCadastrado.value || funcionarioCadastrado.value === '$document' || funcionarioCadastrado.value === '$closeButton') {
                        $scope.listaFuncionarios = $scope.copia;
                        return;
                    } else {
                        $scope.carregarFuncionarios();
                    }
                })
    };

    $scope.alterarStatus = function (funcionario, tipo) {
        svcTipoPendencia.alterarStatus(funcionario.idFuncionario)
            .then(function (res) {
                if (tipo == "inativar") {
                    funcionario.inativo = true;
                    alertaSucesso("Funcionário inativado com sucesso.");
                } else {
                    funcionario.inativo = false;
                    alertaSucesso("Funcionário ativada com sucesso.");
                }
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

    $scope.inativarFuncionario = function (funcionario) {
        alertaConfirmar("inativar funcionário")
            .then(function (res) {
                if (res.value) {
                    $scope.alterarStatus(funcionario, "inativar");
                }
            })
    };

    $scope.ativarFuncionario = function (funcionario) {
        alertaConfirmar("ativar funcionário")
            .then(function (res) {
                if (res.value) {
                    $scope.alterarStatus(funcionario, "ativar");
                }
            })
    };

}]);