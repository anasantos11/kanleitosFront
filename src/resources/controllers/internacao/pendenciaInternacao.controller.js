app.controller('PendenciaInternacao', ["$scope", "$http", "svcPendenciaInternacao", "svcTipoPendencia", "Notify",
    function ($scope, $http, svcPendenciaInternacao, svcTipoPendencia, Notify) {

        if (!isNullOrEmpty($scope.ngDialogData.idRegistroInternacao)) {
            svcPendenciaInternacao.getPendenciasInternacao($scope.ngDialogData.idRegistroInternacao)
                .then(function (res) {
                    $scope.listaPendencias = res.data.data;
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
