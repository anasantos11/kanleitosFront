app.controller('HospitaisController', ['$scope', '$state', 'svcHospital', 'Notify', function ($scope, $state, svcHospital, Notify) {


    $scope.carregarHospitais = function () {
        svcHospital.getHospitais()
            .then(function (res) {
                $scope.listaHospitais = res.data.data;
            })
    };

    $scope.updateHospital = function (hospital){
        hospital.atualizar = true;
        $scope.openModalCadastroHospital(hospital);

    };

    $scope.openModalCadastroHospital = function (hospital) {
        $scope.copia = angular.copy($scope.listaHospitais);
        return Notify.openModal("templates/cadastros-gerais/cadastroHospital.html",  {hospital: hospital}, "50%")
            .closePromise.then(
                function (hospitalCadastrado) {
                    if (!hospitalCadastrado.value || hospitalCadastrado.value === '$document' || hospitalCadastrado.value === '$closeButton') {
                        $scope.listaHospitais = $scope.copia;
                        return;
                    } else {
                        $scope.carregarHospitais();
                    }
                })
    };

    $scope.inativarHospital = function (hospital) {
        alertaConfirmar("inativar o hospital")
            .then(function (res) {
                if (res.value) {
                    svcHospital.inativarHospital(hospital.id_hospital)
                        .then(function (res) {
                            hospital.inativo = true;
                            alertaSucesso("Hospital inativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

    $scope.ativarHospital = function (hospital) {
        alertaConfirmar("ativar o hospital")
            .then(function (res) {
                if (res.value) {
                    svcHospital.ativarHospital(hospital.id_hospital)
                        .then(function (res) {
                            hospital.inativo = false;
                            alertaSucesso("Hospital ativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

}]);