app.controller('ObservacaoInternacao', ["$scope", "$http", "svcObservacaoInternacao", "Notify", "$filter",
    function ($scope, $http, svcObservacaoInternacao, Notify, $filter) {

        $scope.listaObservacoes = [];

        if (!isNullOrEmpty($scope.ngDialogData.idRegistroInternacao)) {
            svcObservacaoInternacao.getObservacoesInternacao($scope.ngDialogData.idRegistroInternacao)
                .then(function (res) {
                    if (res.data.data.length > 0) {
                        $scope.listaObservacoes = res.data.data;
                    }
                    $scope.listaObservacoes.forEach(function (observacao) {
                        if (!isNullOrEmpty(observacao.data))
                            observacao.data = new Date(observacao.data);
                    });

                })
        };

        $scope.salvarObservacaoInternacao = function (observacao) {
            if ($scope.validarObservacaoInternacao(observacao)) {
                if (observacao.nova) {
                    observacao.registroInternacao = {};
                    observacao.registroInternacao.idRegistroInternacao = $scope.ngDialogData.idRegistroInternacao;
                    svcObservacaoInternacao.cadastrarObservacaoInternacao(observacao)
                        .then(function (res) {
                            alertaSucesso("Observação da Internação cadastrada com sucesso.");
                            observacao.idObservacaoInternacao = res.data.data;
                            observacao.edicao = false;
                            observacao.nova = false;
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                } else {
                    svcObservacaoInternacao.updateObservacaoInternacao(observacao)
                        .then(function (res) {
                            alertaSucesso("Observação da Internação atualizada com sucesso.")
                            observacao.edicao = false;
                            delete $scope.copiaListaObservacoes;
                        })
                        .catch(function (err) {
                            alertaErroRequisicao(err);
                        })
                }
            }
        };

        $scope.editarObservacaoInternacao = function (observacao) {
            $scope.copiaListaObservacoes = angular.copy($scope.listaObservacoes);
            observacao.edicao = true;
        };

        $scope.deletarObservacaoInternacao = function (observacao) {
            alertaConfirmar("excluir a observação da internação")
                .then(function (res) {
                    if (res.value) {
                        svcObservacaoInternacao.deletarObservacaoInternacao(observacao.idObservacaoInternacao)
                            .then(function (res) {
                                alertaSucesso("Observação da internação deletada com sucesso.")
                                var indice = $scope.listaObservacoes.indexOf(observacao);
                                $scope.listaObservacoes.splice(indice, 1);
                            })
                            .catch(function (err) {
                                alertaErroRequisicao(err);
                            })
                    }
                })
        };

        $scope.cancelarEdicao = function (observacao) {
            if (observacao.nova) {
                var indice = $scope.listaObservacoes.indexOf(observacao);
                $scope.listaObservacoes.splice(indice, 1)
            } else {
                $scope.listaObservacoes = $scope.copiaListaObservacoes;
                observacao.edicao = false;
            }

        };

        $scope.adicionarObservacao = function () {
            var observacao = {
                edicao: true,
                nova: true
            };
            $scope.listaObservacoes.splice(0, 0, observacao);
        };

        $scope.validarObservacaoInternacao = function (observacao) {
            if (isNullOrEmpty(observacao.descricao)) {
                alertaErro("A descrição da observação precisa ser informada.")
                return;
            }
            if (isNullOrEmpty(observacao.data)) {
                alertaErro("A data da observação da internação precisa ser informada.")
                return;
            }

            return true;
        }

    }
]);
