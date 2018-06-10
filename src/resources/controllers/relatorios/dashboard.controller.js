app.controller('DashboardController',
	function ($filter, alasFactory, svcDashboard, registroInternacaoFactory, $state) {
		var vm = this;
		vm.mensagemSemDados = "Sem dados para serem exibidos no gráfico.";
		vm.colors = ['#11B0F6', '#28a745', '#ffc107', '#FC5E90', '#dc3545', '052EFB', '445090'];
		vm.kanban = {
			verde: {
				qtdPacientes: 0,
				pacientes: []
			},
			vermelho: {
				qtdPacientes: 0,
				pacientes: []
			},
			amarelo: {
				qtdPacientes: 0,
				pacientes: []
			},
			dadosFiltros: {
				idAla: "",
				idEnfermaria: "",
				idLeito: "",
				medicoResponsavel: "",
				residenteResponsavel: "",
				idIsolamento: "",
				nomePaciente: "",
				numProntuario: null,
				dataAdmissao: null,
				previsaoAlta: null,
				classificacao: "",
				status: "Em Andamento"
			}
		};

		alasFactory.getAlas(true)
			.then(function (res) {
				vm.alas = res.data.data
				vm.alaSelecionada = vm.alas[0];
				vm.atualizarGraficos();
			});

		vm.separarRegistrosPorClassificacao = function () {
			vm.kanban.verde.pacientes = $filter("filter")(vm.registros, { classificacao: "verde" });
			vm.kanban.verde.qtdPacientes = vm.kanban.verde.pacientes.length;
			vm.kanban.amarelo.pacientes = $filter("filter")(vm.registros, { classificacao: "amarelo" });
			vm.kanban.amarelo.qtdPacientes = vm.kanban.amarelo.pacientes.length;
			vm.kanban.vermelho.pacientes = $filter("filter")(vm.registros, { classificacao: "vermelho" });
			vm.kanban.vermelho.qtdPacientes = vm.kanban.vermelho.pacientes.length;
			vm.kanban.canShowPacientes = true;
		};

		vm.atualizaPacientesInternados = function () {
			var dataAtual = new Date();
			for (var i = 0; i < vm.registros.length; i++) {
				var diasInternado = calcularDiasDiferenca(dataAtual, new Date(vm.registros[i].pedidoInternacao.dataAdmissao)).dias;
				if (diasInternado < 6) {
					vm.registros[i].classificacao = "verde";
					vm.registros[i].diasInternado = diasInternado;
				} else if (diasInternado < 11) {
					vm.registros[i].classificacao = "amarelo";
					vm.registros[i].diasInternado = diasInternado;
				} else {
					vm.registros[i].classificacao = "vermelho";
					vm.registros[i].diasInternado = diasInternado;
				}
			}
			vm.separarRegistrosPorClassificacao();
		};

		vm.carregarKanban = function () {
			vm.kanban.canShowPacientes = false;
			vm.kanban.dadosFiltros.idAla = vm.alaSelecionada.idAla;
			registroInternacaoFactory.getRegistrosInternacoes(vm.kanban.dadosFiltros)
				.then(function (res) {
					vm.registros = res.data.data;
					vm.atualizaPacientesInternados();
				})
				.catch(function (res) {
					console.log(res.data);
				});

		};

		vm.openDetalhesKanban = function (pacientes) {
            $state.go("classificacaoPacientes", { "pacientes": pacientes, "dadosFiltros": vm.kanban.dadosFiltros});
        };

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
			vm.carregarKanban();
			vm.carregarTaxaOcupacaoAlasEnf(vm.alaSelecionada);
			vm.carregarTaxaStatusLeito(vm.alaSelecionada);
			vm.carregarTaxaTipoPendenciaInternacao(vm.alaSelecionada);
			vm.carregarTaxaOcupacaoGenero();
			vm.carregarTaxaOcupacaoIdade();
		}

	});
