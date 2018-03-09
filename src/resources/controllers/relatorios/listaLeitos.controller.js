
app.controller('leitosController', ["$scope", "$http", "$filter", "alasFactory", "enfermariaFactory", "leitoFactory", function ($scope, $http, $filter, alasFactory, enfermariaFactory, leitoFactory) {

    $scope.dataPages = {};
    $scope.totalPages = null;
    $scope.pages = [];
    $scope.actualPage = null;
    $scope.dataActualPage = [];

    $scope.Inicializar = function () {
        $scope.CarregarLeitos().then(()=>{
            $scope.setArrayNumberPages();
        })

        $scope.actualPage = 1;
    }

    $scope.setArrayNumberPages = function(){
        for(var i = 0; i < $scope.totalPages; i++){
            $scope.pages.push(i+1);
        }
    }

    $scope.changePage = function(page){
        console.log(typeof page)
        if(page < 1 || page > $scope.pages.length){
            console.log("entreiiiiii")
            return;
        }

        $scope.actualPage = page
        $scope.Leitos = $scope.dataPages[page]
    }

    $scope.CarregarLeitos = function () {
        return leitoFactory.getLeitos()
            .then(function (response) {
                var page = 1;
                if(response.data.length < 14){
                    Object.defineProperty($scope.dataPages, page.toString(), {
                        enumerable: false, 
                        configurable: false,
                        writable: false,    
                        value: response.data
                      }); 
                }else{
                    for(var i = 0; i < response.data.length; i++){
                        $scope.dataActualPage.push(response.data[i])
                        
                        if(i % 14 === 0 && i !== 0){
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
                    response.data.message,
                    'error'
                )
            });
    };

    $scope.Inicializar();
}]);

