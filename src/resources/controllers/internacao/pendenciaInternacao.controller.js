app.controller('PendenciaInternacao', ["$scope", "$http", "svcPendenciaInternacao", "svcTipoPendencia", "Notify", "$filter",
    function ($scope, $http, svcPendenciaInternacao, svcTipoPendencia, Notify, $filter) {

        if (!isNullOrEmpty($scope.ngDialogData.idRegistroInternacao)) {
            svcPendenciaInternacao.getPendenciasInternacao($scope.ngDialogData.idRegistroInternacao)
                .then(function (res) {
                    $scope.listaPendencias = res.data.data;
                    $scope.listaPendencias.forEach(function(pendencia) {
                        if(!isNullOrEmpty(pendencia.dataInicio))
                            pendencia.dataInicio = new Date(pendencia.dataInicio);
                        
                        if(!isNullOrEmpty(pendencia.previsaoConclusao))
                            pendencia.previsaoConclusao = new Date(pendencia.previsaoConclusao);
                        
                        if(!isNullOrEmpty(pendencia.dataConclusao))
                            pendencia.dataConclusao = new Date(pendencia.dataConclusao);
                    });
                    
                })
        };

        svcTipoPendencia.getTiposPendencias(true)
            .then(function (res) {
                $scope.tiposPendencias = res.data.data;
            });

       $scope.updatePendencia = function(pendencia){
            debugger;
        };
    }
]);
