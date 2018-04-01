app.controller('IsolamentosController', ['$scope', '$state', 'svcIsolamento', 'Notify', function ($scope, $state, svcIsolamento, Notify) {


    $scope.carregarIsolamentos = function () {
        svcIsolamento.getIsolamentos()
            .then(function (res) {
                $scope.listaIsolamentos = res.data.data;
            })
    };

    $scope.updateIsolamento = function (isolamento){
        isolamento.atualizar = true;
        $scope.openModalCadastroIsolamento(isolamento);
    };

    $scope.openModalCadastroIsolamento = function (isolamento) {
        $scope.copia = angular.copy($scope.listaIsolamentos);
        return Notify.openModal("templates/cadastros-gerais/cadastroTipoIsolamento.html",  {isolamento: isolamento}, "50%")
            .closePromise.then(
                function (isolamentoCadastrado) {
                    if (!isolamentoCadastrado.value || isolamentoCadastrado.value === '$document' || isolamentoCadastrado.value === '$closeButton') {
                        $scope.listaIsolamentos = $scope.copia;
                        return;
                    } else {
                        $scope.carregarIsolamentos();
                    }
                })
    };

    $scope.inativarIsolamento = function (isolamento) {
        alertaConfirmar("inativar o tipo de isolamento")
            .then(function (res) {
                if (res.value) {
                    svcIsolamento.inativarIsolamento(isolamento.idIsolamento)
                        .then(function (res) {
                            isolamento.inativo = true;
                            alertaSucesso("Tipo de isolamento inativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

    $scope.ativarIsolamento = function (isolamento) {
        alertaConfirmar("ativar o tipo de isolamento")
            .then(function (res) {
                if (res.value) {
                    svcIsolamento.ativarIsolamento(isolamento.idIsolamento)
                        .then(function (res) {
                            isolamento.inativo = false;
                            alertaSucesso("Tipo de isolamento ativado com sucesso.");
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }

            })

    };

}]);