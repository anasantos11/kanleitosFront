app.controller('DashboardController',
    function (svcDashboard) {
        var vm = this;
        vm.canShow = true;

        vm.carregarTaxaOcupacaoAlasEnf = function(){
            svcDashboard.taxaOcupacaoAlasEnf()
                .then (function(res){
                    vm.taxaOcupacaoAlasEnf = res.data.data;
                })
        };

        vm.carregarTaxaOcupacaoGenero = function(){
            svcDashboard.taxaOcupacaoGenero()
                .then (function(res){
                    vm.taxaOcupacaoGenero = res.data.data;
                })
        };
    });
