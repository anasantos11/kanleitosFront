app.controller('DashboardController',
    function ($filter, alasFactory, svcDashboard) {
        var vm = this;
        vm.canShow = true;

        alasFactory.getAlas(true)
            .then(function (res) {
                vm.alas = res.data.data
                vm.alaSelecionada = vm.alas[0];
                vm.carregarTaxaOcupacaoAlasEnf(vm.alaSelecionada);
            });

        vm.carregarTaxaOcupacaoAlasEnf = function (ala) {
            svcDashboard.taxaOcupacaoAlasEnf(ala.idAla)
                .then(function (res) {
                    if (res.data.data.enfermarias.length > 0)
                        vm.graficoOcupacaoAlas(res.data.data.enfermarias)
                })
        };

        vm.carregarTaxaOcupacaoGenero = function () {
            svcDashboard.taxaOcupacaoGenero()
                .then(function (res) {
                })
        };

        vm.graficoOcupacaoAlas = function (dados) {
            dados = $filter('orderBy')(dados, 'nomeEnf', false);
            vm.ocupacaoAlas = {
                data: [],
                labels: [],
                series: [],
            };

            var ocupados = [];
            var livres = [];
            var indisponiveis = [];

            for (var i = 0; i < dados.length; i++) {
                vm.ocupacaoAlas.labels.push(dados[i].nomeEnf);
                livres.push(dados[i].quantidadeLeitosLivres);
                ocupados.push(dados[i].quantidadeLeitosOcupados);
                indisponiveis.push(dados[i].quantidadeLeitosIndisponiveis);
            }

            vm.ocupacaoAlas.data = [livres, ocupados, indisponiveis];
            vm.ocupacaoAlas.colors = ['#28a745', '#ffc107', '#dc3545'];
            vm.ocupacaoAlas.options = {
                legend: {
                    display: true,
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            };

            vm.ocupacaoAlas.series = ['Leitos Livres', 'Leitos Ocupados', 'Leitos Indisponíveis'];

        }

        vm.inicializar = function () {
            //vm.carregarTaxaOcupacaoAlasEnf(vm.alas[0].idAla);
        }


        vm.inicializar();
    });
