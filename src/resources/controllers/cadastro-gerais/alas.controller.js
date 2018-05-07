app.controller('AlasController', ['$scope', '$state', 'alasFactory', 'Notify', function ($scope, $state, alasFactory, Notify) {


    $scope.carregarAlas = function () {
        alasFactory.getAlas(false)
            .then(function (res) {
                $scope.listaAlas = res.data.data;
            })
    };

    $scope.confirmarAlteracaoStatus = function (ala, tipo) {
        if (tipo == "inativar") {
            alertaConfirmar("inativar ala, suas enfermarias e leitos. ")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(ala, "Ala inativada com sucesso.");
                    }
                })
        } else {
            alertaConfirmar("ativar ala, suas enfermarias e leitos. ")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(ala, "Ala ativada com sucesso.");
                    }
                })
        }
    };

    $scope.alterarStatus = function (ala, mensagem) {
        alasFactory.alterarStatus(ala.idAla)
            .then(function (res) {
                ala.inativa = !ala.inativa;
                alertaSucesso(mensagem);
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

}]);