app.controller('EnfermariasController', ['$scope', '$state', 'enfermariaFactory', function ($scope, $state, enfermariaFactory) {


    $scope.carregarEnfermarias = function () {
        enfermariaFactory.getEnfermarias(false)
            .then(function (res) {
                $scope.listaEnfermarias = res.data.data;
            })
    };

    $scope.confirmarAlteracaoStatus = function (enfermaria, tipo) {
        if (tipo == "inativar") {
            alertaConfirmar("inativar a enfermaria e seus leitos")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(enfermaria, "Enfermaria e leitos inativados com sucesso.");
                    }
                })
        } else {
            alertaConfirmar("ativar a enfermaria e seus leitos")
                .then(function (res) {
                    if (res.value) {
                        $scope.alterarStatus(enfermaria, "Enfermaria e leitos ativados com sucesso.");
                    }
                })
        }
    };

    $scope.alterarStatus = function (enfermaria, mensagem) {
        enfermariaFactory.alterarStatus(enfermaria.idEnfermaria)
            .then(function (res) {
                enfermaria.inativa = !enfermaria.inativa;
                alertaSucesso(mensagem);
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

}]);