app.controller('InternacoesController', ["$scope", "registroInternacaoFactory",
    function ($scope, registroInternacaoFactory) {
        
        
        $scope.init = function () {
            registroInternacaoFactory.getRegistrosInternacoes()
                .then(function (res) {
                    $scope.listaRegistros = res.data.data;
                })
                .catch(function (res) {
                    console.log(res.data);
                });
        };
    }]);
