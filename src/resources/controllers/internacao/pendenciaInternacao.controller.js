app.controller('PendenciaInternacao', ["$scope", "$http", "svcPendenciaInternacao", "svcTipoPendencia", "Notify", "$filter",
    function ($scope, $http, svcPendenciaInternacao, svcTipoPendencia, Notify, $filter) {

        $scope.listaPendencias = [];

        if (!isNullOrEmpty($scope.ngDialogData.idRegistroInternacao)) {
            svcPendenciaInternacao.getPendenciasInternacao($scope.ngDialogData.idRegistroInternacao)
                .then(function (res) {
                    if (res.data.data.length > 0) {
                        $scope.listaPendencias = res.data.data;
                    }

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

        $scope.salvarPendenciaInternacao = function (pendencia) {
            if ($scope.validarPendenciaInternacao(pendencia)) {
                if (pendencia.nova) {
                    pendencia.registroInternacao = {};
                    pendencia.registroInternacao.idRegistroInternacao = $scope.ngDialogData.idRegistroInternacao;
                    svcPendenciaInternacao.cadastrarPendenciaInternacao(pendencia)
                        .then(function (res) {
                            alertaSucesso("Pendência da Internação cadastrada com sucesso.");
                            pendencia.idPendenciaInternacao = res.data.data;
                            pendencia.edicao = false;
                            pendencia.nova = false;
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                } else {
                    svcPendenciaInternacao.updatePendenciaInternacao(pendencia)
                        .then(function (res) {
                            alertaSucesso("Pendência da Internação atualizada com sucesso.")
                            pendencia.edicao = false;
                            delete $scope.copiaListaPendencias;
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }
            }
        };

        $scope.editarPendenciaInternacao = function (pendencia) {
            $scope.copiaListaPendencias = angular.copy($scope.listaPendencias);
            pendencia.edicao = true;
        };

        $scope.deletarPendenciaInternacao = function (pendencia) {
            alertaConfirmar("deletar a pendência da internação")
                .then(function (res) {
                    if (res.value) {
                        svcPendenciaInternacao.deletarPendenciaInternacao(pendencia.idPendenciaInternacao)
                            .then(function (res) {
                                alertaSucesso("Pendência da internação deletada com sucesso.")
                                var indice = $scope.listaPendencias.indexOf(pendencia);
                                $scope.listaPendencias.splice(indice, 1);
                            })
                            .catch(function (err) {
                                alertaErroRequisicao(err);
                            })
                    }
                })
        };

        $scope.cancelarEdicao = function (pendencia) {
            if (pendencia.nova) {
                var indice = $scope.listaPendencias.indexOf(pendencia);
                $scope.listaPendencias.splice(indice, 1)
            } else {
                $scope.listaPendencias = $scope.copiaListaPendencias;
                pendencia.edicao = false;
            }

        };

        $scope.adicionarPendencia = function () {
            var pendencia = {
                edicao: true,
                nova: true
            };
            $scope.listaPendencias.splice(0, 0, pendencia);
        };

        $scope.validarPendenciaInternacao = function (pendencia) {
            if (isNullOrEmpty(pendencia.tipoPendencia)) {
                alertaErro("O tipo de pendência precisa ser informado.")
                return;
            }
            if (isNullOrEmpty(pendencia.dataInicio)) {
                alertaErro("A data de início precisa ser informada.")
                return;
            }
            if (isNullOrEmpty(pendencia.previsaoConclusao)) {
                alertaErro("A data da previsão de conclusão precisa ser informada.")
                return;
            }

            return true;
        }

    }
]);
