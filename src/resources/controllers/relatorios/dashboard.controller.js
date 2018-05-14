app.controller('DashboardController',
    function ($filter, alasFactory, svcDashboard) {
        var vm = this;
        vm.mensagemSemDados = "Sem dados para serem exibidos no gráfico.";
        vm.colors = ['#11B0F6', '#28a745', '#ffc107', '#FC5E90', '#dc3545', '052EFB', '445090'];
        alasFactory.getAlas(true)
            .then(function (res) {
                vm.alas = res.data.data
                vm.alaSelecionada = vm.alas[0];
                vm.atualizarGraficos();
            });


        vm.graficoTaxa = function (objeto, dados) {
            objeto.options = {
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
                        exibeMensagem: false,
                        data: [],
                        labels: []
                    };
                    if (res.data.data.length > 0) {
                        vm.graficoTaxa(vm.taxaStatusLeito, res.data.data);
                    } else {
                        vm.taxaStatusLeito.exibeMensagem = true;
                    }

                })
        };

        vm.carregarTaxaOcupacaoAlasEnf = function (ala) {
            svcDashboard.taxaOcupacaoAlasEnf(ala.idAla)
                .then(function (res) {
                    vm.ocupacaoAlas = {
                        exibeMensagem: false,
                        data: [],
                        labels: [],
                        series: [],
                    };
                    if (res.data.data.length > 0) {
                        vm.graficoOcupacaoAlas(res.data.data);
                    } else {
                        vm.ocupacaoAlas.exibeMensagem = true;
                    }

                })
        };

        vm.carregarTaxaTipoPendenciaInternacao = function (ala) {
            svcDashboard.taxaTipoPendenciaInternacao(ala.idAla)
                .then(function (res) {
                    vm.taxaTipoPendenciaInternacao = {
                        exibeMensagem: false,
                        data: [],
                        labels: []
                    };
                    if (res.data.data.length > 0) {
                        vm.graficoTaxa(vm.taxaTipoPendenciaInternacao, res.data.data);
                    } else {
                        vm.taxaTipoPendenciaInternacao.exibeMensagem = true;
                    }

                })
        };

        vm.carregarTaxaOcupacaoGenero = function () {
            svcDashboard.taxaOcupacaoGenero()
                .then(function (res) {
                    vm.ocupacaoGenero = {
                        exibeMensagem: false,
                        data: [],
                        labels: []
                    };
                    if (res.data.data.length > 0) {
                        vm.graficoTaxa(vm.ocupacaoGenero, res.data.data);
                    } else {
                        vm.ocupacaoGenero.exibeMensagem = true;
                    }

                })
        };

        vm.carregarTaxaOcupacaoIdade = function () {
            svcDashboard.taxaOcupacaoIdade()
                .then(function (res) {
                    vm.ocupacaoIdade = {
                        exibeMensagem: false,
                        data: [],
                        labels: []
                    };
                    if (res.data.data.length > 0) {
                        vm.graficoTaxa(vm.ocupacaoIdade, res.data.data);
                    } else {
                        vm.ocupacaoIdade.exibeMensagem = true;
                    }

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
            vm.carregarTaxaTipoPendenciaInternacao(vm.alaSelecionada);
            vm.carregarTaxaOcupacaoGenero();
            vm.carregarTaxaOcupacaoIdade();
        }

    });
