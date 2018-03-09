app.controller('loginController', ["$scope", "$http", "usuarioFactory", function ($scope, $http, usuarioFactory) {

    $scope.NovoLogin = function () {
        $scope.login = {
            login: "",
            senha: "",
        }
    }
    $scope.NovoLogin();

    $scope.validarCamposLogin = function () {
        if ($scope.login.login == "") {
            swal(
                'Erro!',
                'Insira o login',
                'error'
            )
            return;
        }
        if ($scope.login.senha == "") {
            swal(
                'Erro!',
                'Insira a senha',
                'error'
            )
            return;
        }

        return true;
    }


    $scope.verificarErro = function (codigoErro) {
        if (codigoErro == 'auth/invalid-email') {
            return "E-mail inválido."
        }
        if(codigoErro == 'auth/user-not-found'){
            return "Usuário não encontrado.";
        }
        if(codigoErro == 'auth/wrong-password'){
            return "Senha incorreta";
        }

        return "Verifique os dados e tente novamente.";

    };

    $scope.realizarLogin = function () {
        if ($scope.validarCamposLogin()) {
            firebase.auth().signInWithEmailAndPassword($scope.login.login, $scope.login.senha)
                .catch(function (error) {
                    swal(
                        $scope.verificarErro(error.code),
                        "",
                        'error'
                    )

                });
        }
    };

}]);