app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state('kanleitos', {
			url: '/kanleitos',
			views: {
				'app@': {
					templateUrl: 'templates/home.html',
					controller: 'MainController'
				},
				'contentApp@kanleitos': {
					templateUrl: 'templates/relatorios/dashboard.html',
					controller: 'DashboardController',
					controllerAs: "vm"
				},
				'menuKan@kanleitos': {
					templateUrl: 'templates/menu.html',
					controller: 'MainController'
				}
			}
		})
		.state("login", {
			url: "/login",
			views: {
				'login': {
					templateUrl: "templates/login.html",
					controller: "loginController"
				}
			}
		})
		.state("emConstrucao", {
			parent: "kanleitos",
			url: "/emConstrucao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/erro.html",
				}
			}

		})
		.state("cadastroPaciente", {
			parent: "kanleitos",
			url: "/cadastroPaciente",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/internacao/cadastroPaciente.html"
				}
			}

		})
		.state("pedidoInternacao", {
			parent: "kanleitos",
			url: "/pedidoInternacao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/internacao/pedidoInternacao.html"
				}
			}

		})

		.state("registroInternacao", {
			parent: "kanleitos",
			url: "/registroInternacao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/internacao/registroInternacao.html"
				}
			}

		})

		.state("finalizacaoInternacao", {
			parent: "kanleitos",
			url: "/finalizacaoInternacao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/internacao/finalizacaoInternacao.html",
					controller: "FinalizacaoInternacaoController",
					controllerAs: "vm"
				}
			}

		})

		.state("leitos", {
			parent: "kanleitos",
			url: "/leitos",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/relatorios/leitos.html"
				}
			}

		})
		.state("pedidosInternacao", {
			parent: "kanleitos",
			url: "/pedidosInternacao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/relatorios/listaPedidosInternacao.html"
				}
			}

		})
		.state("registrosInternacao", {
			parent: "kanleitos",
			url: "/registrosInternacao",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/relatorios/listaRegistrosInternacao.html"
				}
			}

		})
		.state("classificacaoPacientes", {
			parent: "kanleitos",
			params: {
				pacientes: [],
				dadosFiltros: {}
			},
			url: "/classificacaoPacientes",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/relatorios/kanbanListaRegistroInternacao.html",
					controller: function ($scope, $stateParams) {
						$scope.pacientes = $stateParams.pacientes;
						$scope.dadosFiltros = $stateParams.dadosFiltros;
					}
				}
			}


		})
		.state("hospitais", {
			parent: "kanleitos",
			url: "/hospitais",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/hospitais.html"
				}
			}


		})
		.state("alas", {
			parent: "kanleitos",
			url: "/alas",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/alas.html"
				}
			}


		})
		.state("enfermarias", {
			parent: "kanleitos",
			url: "/enfermarias",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/enfermarias.html"
				}
			}


		})
		.state("tiposExames", {
			parent: "kanleitos",
			url: "/tiposExames",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/tiposExames.html"
				}
			}
		})
		// .state("tiposIsolamentos", {
		// 	parent: "kanleitos",
		// 	url: "/tiposIsolamentos",
		// 	views: {
		// 		"contentApp@kanleitos": {
		// 			templateUrl: "templates/cadastros-gerais/tiposIsolamentos.html"
		// 		}
		// 	}
		// })
		.state("tiposPendencias", {
			parent: "kanleitos",
			url: "/tiposPendencias",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/tiposPendencias.html"
				}
			}
		})
		.state("funcionarios", {
			parent: "kanleitos",
			url: "/funcionarios",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/funcionarios.html"
				}
			}
		});
})

app.run(['$rootScope', '$location', "$state",
	function ($rootScope, $location, $state) {

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var rota = $location.path();
			if (rota == '/login' || rota == '/' || rota == '') {
				$rootScope.IsLogin = true;
			} else if (rota != '/' && rota != '') {
				$rootScope.IsLogin = false;
				if (!isLogado) {
					event.preventDefault();
					$state.go('kanleitos');
				}
			}
		});
	}]);