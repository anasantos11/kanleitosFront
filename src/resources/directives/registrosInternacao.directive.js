app.directive('listaRegistrosInternacao', function (registroInternacaoFactory, $filter, $rootScope, Notify) {
	return {
		templateUrl: "templates/directives/registrosInternacao.html",
		scope: {
			registros: "=",
			ocultaLegenda: "=",
			showAcoes: "=",
			dadosFiltros: "=",
			evento: "=",
			ocultaStatus: "=ocultaStatus",
			naoCarregarAoIniciar: "=?naoCarregarAoIniciar"
		},
		link: function (scope, element, attrs) {

			scope.evento = "filtrarRegistros";
			scope.novoFiltro = function () {
				scope.dadosFiltros = {
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
				};
			};

			scope.atualizaPacientesInternados = function () {
				var dataAtual = new Date();
				for (var i = 0; i < scope.registros.length; i++) {
					var diasInternado = calcularDiasDiferenca(dataAtual, new Date(scope.registros[i].pedidoInternacao.dataAdmissao)).dias;
					if (diasInternado < 6) {
						scope.registros[i].classificacao = "verde";
						scope.registros[i].diasInternado = diasInternado;
					} else if (diasInternado < 11) {
						scope.registros[i].classificacao = "amarelo";
						scope.registros[i].diasInternado = diasInternado;
					} else {
						scope.registros[i].classificacao = "vermelho";
						scope.registros[i].diasInternado = diasInternado;
					}
				}
			};

			scope.carregarRegistros = function () {
				registroInternacaoFactory.getRegistrosInternacoes(scope.dadosFiltros)
					.then(function (res) {
						scope.registros = res.data.data;
						scope.atualizaPacientesInternados();
					})
					.catch(function (res) {
						console.log(res.data);
					});
			};

			$rootScope.$on(scope.evento, function (event) {
				scope.carregarRegistros();
			});

			scope.openModalPendenciasInternacao = function (registro) {
				return Notify.openModal("templates/internacao/pendenciaInternacao.html", { idRegistroInternacao: registro.idRegistroInternacao }, "95%")
			};

			scope.openModalObservacoesInternacao = function (registro) {
				return Notify.openModal("templates/internacao/observacaoInternacao.html", { idRegistroInternacao: registro.idRegistroInternacao }, "95%")
			};

			scope.openModalTransferenciasLeito = function (registro) {
				return Notify.openModal("templates/internacao/transferenciaLeito.html", { registro: registro }, "95%")
					.closePromise.then(function (res) {
						scope.carregarRegistros();
					})
			};

			scope.closeModal = function (registro) {
				scope.$parent.closeThisDialog(registro);
			};


			if (!scope.naoCarregarAoIniciar) {
				scope.novoFiltro();
				scope.carregarRegistros();
			}

		}
	};
});
