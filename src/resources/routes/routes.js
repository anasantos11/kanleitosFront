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
					templateUrl: 'templates/relatorios/kanbanDashboard.html',
					controller: 'MainController'
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
					templateUrl: "templates/relatorios/listaPedidosInternacaoAbertos.html"
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
			},
			url: "/classificacaoPacientes",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/relatorios/kanbanListaRegistroInternacao.html",
					controller: function ($scope, $stateParams) {
						$scope.pacientes = $stateParams.pacientes;
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
		.state("tiposIsolamentos", {
			parent: "kanleitos",
			url: "/tiposIsolamentos",
			views: {
				"contentApp@kanleitos": {
					templateUrl: "templates/cadastros-gerais/tiposIsolamentos.html"
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