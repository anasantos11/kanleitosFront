app.controller('PendenciaInternacao', ["$scope", "$http", "svcPendenciaInternacao", "svcTipoPendencia", "Notify", "$filter",
    function ($scope, $http, svcPendenciaInternacao, svcTipoPendencia, Notify, $filter) {

        if (!isNullOrEmpty($scope.ngDialogData.idRegistroInternacao)) {
            svcPendenciaInternacao.getPendenciasInternacao($scope.ngDialogData.idRegistroInternacao)
                .then(function (res) {
                    $scope.listaPendencias = res.data.data;
                    $scope.listaPendencias.forEach(function (pendencia) {
                        if (!isNullOrEmpty(pendencia.dataInicio))
                            pendencia.dataInicio = new Date(pendencia.dataInicio);

                        if (!isNullOrEmpty(pendencia.previsaoConclusao))
                            pendencia.previsaoConclusao = new Date(pendencia.previsaoConclusao);

                        if (!isNullOrEmpty(pendencia.dataConclusao))
                            pendencia.dataConclusao = new Date(pendencia.dataConclusao);
                    });

                })
        };

        svcTipoPendencia.getTiposPendencias(true)
            .then(function (res) {
                $scope.tiposPendencias = res.data.data;
            });

        $scope.updatePendenciaInternacao = function (pendencia) {
            svcPendenciaInternacao.updatePendenciaInternacao(pendencia)
                .then(function (res) {
                    alertaSucesso("Pendência de Internação atualizada com sucesso.")
                    pendencia.Edicao = false;
                    delete $scope.copiaListaPendencias;
                })
                .catch(function (err) {
                    alertaErroRequisicao(err);
                })
        };

        $scope.editarPendenciaInternacao = function (pendencia) {
            $scope.copiaListaPendencias = angular.copy($scope.listaPendencias);
            pendencia.Edicao = true;
        };

        $scope.cancelarEdicao = function (pendencia) {
            $scope.listaPendencias = $scope.copiaListaPendencias;
            pendencia.Edicao = false;
        };

    }
]);
