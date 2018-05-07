app.controller('AlasController', ['$scope', '$state', 'alasFactory', 'Notify', function ($scope, $state, alasFactory, Notify) {


    $scope.carregarAlas = function () {
        alasFactory.getAlas(false)
            .then(function (res) {
                $scope.listaAlas = res.data.data;
            })
    };

    $scope.alterarStatus = function (ala, tipo) {
        alasFactory.alterarStatus(ala.idAla)
            .then(function (res) {
                if (tipo == "inativar") {
                    ala.inativa = true;
                    alertaSucesso("Ala inativada com sucesso.");
                } else {
                    ala.inativa = false;
                    alertaSucesso("Ala ativada com sucesso.");
                }
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

}]);