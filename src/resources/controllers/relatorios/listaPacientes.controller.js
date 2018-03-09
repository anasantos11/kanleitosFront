app.controller('ModalPesquisaController', ["$scope", "$http", "$filter", "pacienteFactory", "Notify",
    function ($scope, $http, $filter, pacienteFactory, Notify) {
        $scope.carregarPacientes = function () {
            pacienteFactory.getPacientes()
                .then(function (response) {
                    $scope.ListaPacientes = response.data;
                }, function (response) {
                    if (response.data != undefined) {
                        swal(
                            'Erro!',
                            response.data.message,
                            'error'
                        )
                    } else {
                        swal(
                            'Erro!',
                            'Ocorreu algum erro no servidor',
                            'error'
                        )
                    }
                });
        };
    }
]);
