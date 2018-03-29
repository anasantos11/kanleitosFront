app.controller('ModalPesquisaPedidoInternacaoController', ["$scope", "pedidoInternacaoFactory",
    function ($scope, pedidoInternacaoFactory) {
        $scope.calcularHorasAguardando = function (dataAtual, dataAdmissao) {
            var one_day = 1000 * 60 * 60 * 24;

            // Convert both dates to milliseconds
            var date1_ms = dataAdmissao.getTime();
            var date2_ms = dataAtual.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
            //take out milliseconds
            difference_ms = difference_ms / 1000;
            var seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms / 60;
            var minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms / 60;
            var hours = Math.floor(difference_ms % 24);
            var days = Math.floor(difference_ms / 24);

            var tempo = {
                dias: days,
                horas: hours,
                minutos: minutes
            };

            return tempo;

        };

        $scope.atualizarHorasAguardando = function () {
            var dataAtual = new Date();
            for (var i = 0; i < $scope.listaPedidos.length; i++) {
                $scope.listaPedidos[i].tempo = $scope.calcularHorasAguardando(dataAtual, new Date($scope.listaPedidos[i].dataAdmissao))
            };
        };


        $scope.init = function () {
            registroInternacaoFactory.getRegistrosInternacoes()
                .then(function (res) {
                    $scope.atualizaPacientesInternados(res.data.data);
                })
                .catch(function (res) {
                    console.log(res.data);
                });
                }, function (response) {
                    if (response != undefined) {
                        swal(
                            'Erro!',
                            response.data.messages,
                            'error'
                        )
                    } else {
                        swal(
                            'Erro!',
                            'Ocorreu algum erro no servidor',
                            'error'
                        )
                    }
        };
    }]);
