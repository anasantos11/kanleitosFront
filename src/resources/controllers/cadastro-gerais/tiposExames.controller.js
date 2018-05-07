app.controller('ExamesController', ['$scope', '$state', 'svcTipoExame', 'Notify', function ($scope, $state, svcTipoExame, Notify) {


    $scope.carregarExames = function () {
        svcTipoExame.getTiposExames(false)
            .then(function (res) {
                $scope.listaTiposExames = res.data.data;
            })
    };

    $scope.updateTipoExame = function (tipoExame) {
        tipoExame.atualizar = true;
        $scope.openModalCadastroTipoExame(tipoExame);
    };

    $scope.openModalCadastroTipoExame = function (tipoExame) {
        $scope.copia = angular.copy($scope.listaTiposExames);
        return Notify.openModal("templates/cadastros-gerais/cadastroTipoExame.html", { tipoExame: tipoExame }, "50%")
            .closePromise.then(
                function (tipoExameCadastrado) {
                    if (!tipoExameCadastrado.value || tipoExameCadastrado.value === '$document' || tipoExameCadastrado.value === '$closeButton') {
                        $scope.listaTiposExames = $scope.copia;
                        return;
                    } else {
                        $scope.carregarExames();
                    }
                })
    };


    $scope.confirmarAlteracaoStatus = function (tipoExame, tipo) {
        if (tipo == "inativar") {
            alertaConfirmar("inativar o tipo de exame")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(tipoExame, "Tipo de exame inativado com sucesso.");
                    }
                })
        } else {
            alertaConfirmar("ativar o tipo de exame")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(tipoExame, "Tipo de exame ativado com sucesso.");
                    }
                })
        }
    };

    $scope.alterarStatus = function (tipoExame, mensagem) {
        svcTipoExame.alterarStatus(tipoExame.tipoExameId)
            .then(function (res) {
                tipoExame.inativo = !tipoExame.inativo;
                alertaSucesso(mensagem);
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };
}]);