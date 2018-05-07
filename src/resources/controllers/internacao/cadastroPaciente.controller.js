app.controller('ModalCadastroController', ["$scope", "$http", "$filter", "pacienteFactory", "Notify",
    function ($scope, $http, $filter, pacienteFactory, Notify) {

        $scope.paciente = {
            numProntuario: null,
            nomePaciente: null,
            nomeMae: null,
            dataNascimento: null,
            idade: null,
            genero: null,
        }

        $scope.cadastrarPaciente = function (paciente) {
            if ($scope.validarDadosPaciente()) {
                $scope.paciente.dataNascimento = moment($scope.paciente.dataNascimento).format();
                pacienteFactory.savePaciente($scope.paciente)
                    .then(function (response) {
                        alertaSucesso("Cadastro realizado com sucesso.");
                        return $scope.closeThisDialog($scope.paciente);
                    })
                    .catch(function (err) {
                        alertaErroRequisicao(err);
                    })
            }
        }

        $scope.validarDadosPaciente = function () {
            if (!$scope.paciente.numProntuario) {
                alertaPreenchimentoCampo("número do prontuário");
                return;
            }
            if (!$scope.paciente.nomePaciente) {
                alertaPreenchimentoCampo("nome do paciente");
                return;
            }
            if (!$scope.paciente.nomeMae) {
                alertaPreenchimentoCampo("nome da mãe do paciente");
                return;
            }
            if (!$scope.paciente.dataNascimento) {
                alertaPreenchimentoCampo("data de nascimento");
                return;
            }
            if (!$scope.paciente.idade) {
                alertaPreenchimentoCampo("idade");
                return;
            }
            if (!$scope.paciente.genero) {
                alertaPreenchimentoCampo("sexo");
                return;
            }
            return true;
        }

        $scope.calcularIdade = function () {

            // Obtém a idade em milissegundos
            var idadeP = new Date() - new Date($scope.paciente.dataNascimento).getTime();

            // Converte os milissegundos em data e subtrai da era linux
            var idadeData = new Date(idadeP);
            var idade = idadeData.getUTCFullYear() - 1970;
            if (!isNaN(idade) && idade != undefined) {
                $scope.paciente.idade = idade;
            } else {
                $scope.paciente.idade = 0;
            }

        }
    }
]);
