app.controller('DashboardController',
    function ($filter, alasFactory, svcDashboard) {
        var vm = this;
        vm.colors = ['#0D91BC', '#09607C', '#12C3FC', '#042F3D', '#10AFE2'];
        alasFactory.getAlas(true)
            .then(function (res) {
                vm.alas = res.data.data
                vm.alaSelecionada = vm.alas[0];
                vm.atualizarGraficos();
            });


        vm.graficoTaxa = function (objeto, dados) {
            objeto.options = {
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: function (context) {
                            return context.dataset.data[context.dataIndex] > 0;
                        },
                        font: {
                            weight: 'bold'
                        },
                        formatter: Math.round
                    }
                }
            };
            for (var i = 0; i < dados.length; i++) {
                objeto.labels.push(dados[i].grupo);
                objeto.data.push(dados[i].quantidade);
            }

            vm.taxaStatusLeito;
        };

        vm.carregarTaxaStatusLeito = function (ala) {
            svcDashboard.taxaStatusLeito(ala.idAla)
                .then(function (res) {
                    vm.taxaStatusLeito = {
                        data: [],
                        labels: []
                    };
                    if (res.data.data.length > 0)
                        vm.graficoTaxa(vm.taxaStatusLeito, res.data.data);
                })
        };

        vm.carregarTaxaOcupacaoAlasEnf = function (ala) {
            svcDashboard.taxaOcupacaoAlasEnf(ala.idAla)
                .then(function (res) {
                    vm.ocupacaoAlas = {
                        data: [],
                        labels: [],
                        series: [],
                    };
                    if (res.data.data.length > 0)
                        vm.graficoOcupacaoAlas(res.data.data)
                })
        };

        vm.carregarTaxaOcupacaoGenero = function () {
            svcDashboard.taxaOcupacaoGenero()
                .then(function (res) {
                })
        };

        vm.graficoOcupacaoAlas = function (dados) {
            dados = $filter('orderBy')(dados, 'nomeEnf', false);
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
                plugins: {
                    datalabels: {
                        color: 'black',
                        display: function (context) {
                            return context.dataset.data[context.dataIndex] > 0;
                        },
                        font: {
                            weight: 'bold'
                        },
                        formatter: Math.round
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            };
            vm.ocupacaoAlas.series = ['Leitos Livres', 'Leitos Ocupados', 'Leitos Indisponíveis'];

        }

        vm.atualizarGraficos = function () {
            vm.carregarTaxaOcupacaoAlasEnf(vm.alaSelecionada);
            vm.carregarTaxaStatusLeito(vm.alaSelecionada);
        }

    });
