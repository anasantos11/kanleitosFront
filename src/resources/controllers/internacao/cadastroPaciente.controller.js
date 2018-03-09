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
            $scope.paciente.dataNascimento = $filter('date')($scope.paciente.dataNascimento, 'yyyy-MM-dd');

            pacienteFactory.savePaciente($scope.paciente)
                .then(function (response) {
                    if(!response.data.erro){                    
                        swal( 'Concluído!',
                        'Cadastro realizado com sucesso - Paciente: ' + response.data.nomePaciente,
                        'success'
                        )
                        return $scope.closeThisDialog(response.data);
                    }else{
                        swal( 'Erro!',
                            'Paciente já cadastrado!',
                            'error'
                        )
                        return;
                    }
                    
                })
                .catch((response)=>{
                        if (response.data != undefined) {
                            swal(
                                'Erro!',
                                response.data.error + " " + response.data.message,
                                'error'
                            )
                        } else {
                            swal(
                                'Erro!',
                                response.message,
                                'error'
                            )
                        }
                    })
                }
    }

    $scope.validarDadosPaciente = function () {
        if (!$scope.paciente.numProntuario) {
            swal(
                'Erro!',
                'Digite o número do prontuário!',
                'error'
            )
            return;
        }
        if (!$scope.paciente.nomePaciente) {
            swal(
                'Erro!',
                'Digite o nome do paciente!',
                'error'
            )
            return;
        }
        if (!$scope.paciente.nomeMae) {
            swal(
                'Erro!',
                'Digite o nome da mãe do paciente!',
                'error'
            )
            return;
        }
        if (!$scope.paciente.dataNascimento) {
            swal(
                'Erro!',
                'Digite a data de nascimento!',
                'error'
            )
            return;
        }
        if (!$scope.paciente.idade) {
            swal(
                'Erro!',
                'Digite a idade do paciente!',
                'error'
            )
            return;
        }
        if (!$scope.paciente.genero) {
            swal(
                'Erro!',
                'Digite o sexo do paciente!',
                'error'
            )
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
