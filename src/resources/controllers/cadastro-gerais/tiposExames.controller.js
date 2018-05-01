app.controller('ExamesController', ['$scope', '$state', 'svcExame', 'Notify', function ($scope, $state, svcExame, Notify) {


    $scope.carregarExames = function () {
        svcExame.getExames()
            .then(function (res) {
                $scope.listaExames = res.data.data;
            })
    };

    $scope.updateExame = function (exame){
        exame.atualizar = true;
        $scope.openModalCadastroExame(exame);
    };

    $scope.openModalCadastroExame = function (exame) {
        $scope.copia = angular.copy($scope.listaExames);
        return Notify.openModal("templates/cadastros-gerais/cadastroTipoExame.html",  {exame: exame}, "50%")
            .closePromise.then(
                function (exameCadastrado) {
                    if (!exameCadastrado.value || exameCadastrado.value === '$document' || exameCadastrado.value === '$closeButton') {
                        $scope.listaExames = $scope.copia;
                        return;
                    } else {
                        $scope.carregarExames();
                    }
                })
    };

    $scope.inativarExame = function (exame) {
        alertaConfirmar("inativar o tipo de exame")
            .then(function (res) {
                if (res.value) {
                    svcExame.inativarExame(exame.idExame)
                        .then(function (res) {
                            exame.inativo = true;
                            alertaSucesso("Tipo de exame inativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

    $scope.ativarExame = function (exame) {
        alertaConfirmar("ativar o tipo de exame")
            .then(function (res) {
                if (res.value) {
                    svcExame.ativarExame(exame.idExame)
                        .then(function (res) {
                            exame.inativo = false;
                            alertaSucesso("Tipo de exame ativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

}]);