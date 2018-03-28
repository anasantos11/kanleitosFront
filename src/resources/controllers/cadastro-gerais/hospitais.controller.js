app.controller('HospitaisController', ['$scope', '$state', 'svcHospital', 'Notify', function ($scope, $state, svcHospital, Notify) {


    $scope.carregarHospitais = function () {
        svcHospital.getHospitais()
            .then(function (res) {
                $scope.listaHospitais = res.data.data;
            })
    };

    $scope.openModalCadastroHospital = function () {
        return Notify.openModal("templates/cadastros-gerais/cadastroHospital.html", null, "50%")
            .closePromise.then(
                function (hospitalCadastrado) {
                    if (!hospitalCadastrado.value || hospitalCadastrado.value === '$document' || hospitalCadastrado.value === '$closeButton') {
                        return;
                    } else {
                        $scope.carregarHospitais();
                    }
                })
    };

    $scope.updateHospital = function (hospital) {
        hospital.atualizar = true;
        $state.go('cadastroHospital', { hospital: hospital });
    };

}]);