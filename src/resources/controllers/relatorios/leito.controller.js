app.controller('leitoController',
	function ($scope, $http, leitoFactory, Notify) {

		$scope.title = "Edição do leito";
		if (!isNullOrEmpty($scope.ngDialogData.leito)) {
			$scope.title = "Editar leito:" + $scope.ngDialogData.leito.nomeLeito;
			$scope.leito = $scope.ngDialogData.leito;
		}

		$scope.updateLeito = function () {
			if ($scope.validarLeito()) {
				leitoFactory.updateLeito($scope.leito)
					.then(function (res) {
						alertaSucesso("O leito foi atualizado com sucesso.");
						return $scope.closeThisDialog($scope.leito);
					})
					.catch(function (err) {
						alertaErroRequisicao(err);
					})
			}

		}

		$scope.validarLeito = function () {
			if (isNullOrEmpty($scope.leito.nomeLeito)) {
				alertaPreenchimentoCampo("nome do leito");
				return;
			}

			if (isNullOrEmpty($scope.leito.tipoLeito)) {
				alertaPreenchimentoCampo("tipo do leito");
				return;
			}

			if (isNullOrEmpty($scope.leito.generoLeito)) {
				alertaPreenchimentoCampo("status do leito");
				return;
			}

			if (isNullOrEmpty($scope.leito.statusLeito)) {
				alertaPreenchimentoCampo("status do leito");
				return;
			}

			return true;
		};

	}
);
