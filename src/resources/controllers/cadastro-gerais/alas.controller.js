app.controller('AlasController', ['$scope', '$state', 'svcAla', 'Notify', function ($scope, $state, svcAla, Notify) {


    $scope.carregarAla = function () {
        svcAla.geAla()
            .then(function (res) {
                $scope.listaAlas = res.data.data;
            })
    };

    $scope.alterarStatus = function (ala) {
        svcAla.alterarStatus(ala.idAla)
            .then(function (res) {
                if (tipo == "inativar") {
                    ala.inativo = true;
                    alertaSucesso("Ala inativada com sucesso.");
                } else {
                    ala.inativo = false;
                    alertaSucesso("Ala ativada com sucesso.");
                }
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

}]);