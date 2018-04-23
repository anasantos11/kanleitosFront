app.controller('TiposPendenciasController', ['$scope', '$state', 'svcTipoPendencia', 'Notify', function ($scope, $state, svcTipoPendencia, Notify) {


    $scope.carregarTiposPendencias = function () {
        svcTipoPendencia.getTiposPendencias()
            .then(function (res) {
                $scope.listaTiposPendencias = res.data.data;
            })
    };

    $scope.updateTipoPendencia = function (tipoPendencia) {
        tipoPendencia.atualizar = true;
        $scope.openModalCadastroTipoPendencia(tipoPendencia);
    };

    $scope.openModalCadastroTipoPendencia = function (tipoPendencia) {
        $scope.copia = angular.copy($scope.listaTiposPendencias);
        return Notify.openModal("templates/cadastros-gerais/cadastroTipoPendencia.html", { tipoPendencia: tipoPendencia }, "50%")
            .closePromise.then(
                function (tipoPendenciaCadastrado) {
                    if (!tipoPendenciaCadastrado.value || tipoPendenciaCadastrado.value === '$document' || tipoPendenciaCadastrado.value === '$closeButton') {
                        $scope.listaTiposPendencias = $scope.copia;
                        return;
                    } else {
                        $scope.carregarTiposPendencias();
                    }
                })
    };

    $scope.alterarStatus = function (tipoPendencia, tipo) {
        svcTipoPendencia.alterarStatus(tipoPendencia.idPendencia)
            .then(function (res) {
                if (tipo == "inativar") {
                    tipoPendencia.inativo = true;
                    alertaSucesso("Tipo de pendência inativado com sucesso.");
                } else {
                    tipoPendencia.inativo = false;
                    alertaSucesso("Tipo de pendência ativada com sucesso.");
                }
            })
            .catch(function (err) {
                alertaErroRequisicao(err);
            })
    };

    $scope.inativarTipoPendencia = function (tipoPendencia) {
        alertaConfirmar("inativar o tipo de pendência")
            .then(function (res) {
                if (res.value) {
                    $scope.alterarStatus(tipoPendencia, "inativar");
                }

            })

    };

    $scope.ativarTipoPendencia = function (tipoPendencia) {
        alertaConfirmar("ativar o tipo de pendência")
            .then(function (res) {
                if (res.value) {
                    $scope.alterarStatus(tipoPendencia, "ativar");
                }

            })

    };

}]);