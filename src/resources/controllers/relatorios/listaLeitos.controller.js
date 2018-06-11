
app.controller('leitosController', function ($scope, leitoFactory, Notify) {

    $scope.dataPages = {};
    $scope.totalPages = null;
    $scope.pages = [];
    $scope.actualPage = null;
    $scope.dataActualPage = [];

    $scope.Inicializar = function () {
        $scope.CarregarLeitos().then(function (res) {
            $scope.setArrayNumberPages();
        })

        $scope.actualPage = 1;
    }

    $scope.setArrayNumberPages = function () {
        for (var i = 0; i < $scope.totalPages; i++) {
            $scope.pages.push(i + 1);
        }
    }

    $scope.changePage = function (page) {
        console.log(typeof page)
        if (page < 1 || page > $scope.pages.length) {
            console.log("entreiiiiii")
            return;
        }

        $scope.actualPage = page
        $scope.Leitos = $scope.dataPages[page]
    }

    $scope.CarregarLeitos = function () {
        return leitoFactory.getLeitos(false)
            .then(function (response) {
                var res = response.data.data;
                var page = 1;
                if (res.length < 14) {
                    Object.defineProperty($scope.dataPages, page.toString(), {
                        enumerable: false,
                        configurable: false,
                        writable: false,
                        value: res
                    });
                } else {
                    for (var i = 0; i < res.length; i++) {
                        $scope.dataActualPage.push(res[i])

                        if (i % 14 === 0 && i !== 0) {
                            Object.defineProperty($scope.dataPages, page.toString(), {
                                enumerable: false,
                                configurable: false,
                                writable: false,
                                value: $scope.dataActualPage
                            });
                            page++;
                            $scope.dataActualPage = [];
                        }
                    }
                }
                $scope.Leitos = $scope.dataPages[1]
                $scope.totalPages = page
            }, function (response) {
                swal(
                    'Erro!',
                    response.data.messages,
                    'error'
                )
            });
    };

    $scope.editarLeito = function (leito) {
        $scope.copiaLeito = angular.copy(leito);
        return Notify.openModal("templates/relatorios/leito.html", { leito: leito }, "60%")
            .closePromise.then(function (res) {
                if (!res.value || res.value === '$document' || res.value === '$closeButton') {
                    angular.copy($scope.copiaLeito, leito);
                    return;
                }
            })
    };
});

