app.controller('TransferenciaLeito', function ($scope, $http, svcTransferenciaLeito, Notify, $filter, alasFactory, enfermariaFactory, leitoFactory, svcIsolamento) {

    $scope.listaTransferencias = [];
    $scope.inicializar = function () {
        $scope.transferencia = {
            data: new Date(new Date(new Date().setSeconds(0)).setMilliseconds(0))
        };

        if (!isNullOrEmpty($scope.ngDialogData.registro)) {
           $scope.transferencia.registroInternacao = $scope.ngDialogData.registro;
            $scope.carregarTransferenciaLeito($scope.transferencia.registroInternacao.idRegistroInternacao);
        };
    };

    $scope.carregarTransferenciaLeito = function (idRegistroInternacao) {
        svcTransferenciaLeito.getTransferenciaRegistro(idRegistroInternacao)
            .then(function (res) {
                if (res.data.data.length > 0) {
                    $scope.listaTransferencias = res.data.data;
                }
                $scope.listaTransferencias.forEach(function (transf) {
                    if (!isNullOrEmpty(transf.data))
                        transf.data = new Date(transf.data);
                });

            })
    };

    $scope.inicializar();

    alasFactory.getAlas(false)
        .then(function (res) {
            $scope.alas = res.data.data;
        });

    $scope.carregarEnfermarias = function () {
        enfermariaFactory.getEnfermariasByAlas($scope.transferencia.ala.idAla, true)
            .then(function (response) {
                $scope.enfermarias = response.data.data;
                delete $scope.leitos;
            });
    };

    $scope.verificarIsolamentos = function () {
        svcIsolamento.getIsolamentosByEnfermaria($scope.transferencia.enfermaria.idEnfermaria)
            .then(function (res) {
                var listaIsolamentos = res.data.data;
                document.getElementById("mensagemIsolamentos").innerHTML = "";

                if (listaIsolamentos.length > 0) {
                    var enf = $scope.enfermarias.filter(function (obj) {
                        return (obj.idEnfermaria == $scope.transferencia.enfermaria.idEnfermaria);
                    })[0];

                    $scope.mensagemIsolamentos = "Existem pacientes internados na <strong>" + enf.ala.nomeAla + " enfermaria " +
                        enf.nomeEnfermaria.toUpperCase() + "</strong> com os seguintes tipos de isolamentos: " +
                        "<strong class='text-danger'> " + listaIsolamentos.join(", ").toLowerCase() + "</strong>";

                    document.getElementById("mensagemIsolamentos").innerHTML = $scope.mensagemIsolamentos;
                    alertaInformacao($scope.mensagemIsolamentos);
                }

            })
    };

    $scope.carregarLeitos = function () {
        leitoFactory.getLeitoEnfermaria($scope.transferencia.enfermaria.idEnfermaria, true)
            .then(function (response) {
                $scope.leitos = response.data.data;
            });
    };

    $scope.cadastrarTransferencia = function () {
        if ($scope.validarTransferenciaLeito()) {
            svcTransferenciaLeito.cadastrarTransferenciaLeito($scope.transferencia)
                .then(function (res) {
                    $scope.inicializar();
                    alertaSucesso("Transferência de leito realizada com sucesso.");
                })
                .catch(function (err) {
                    alertaErroRequisicao(err);
                })

        }
    };

    $scope.validarTransferenciaLeito = function (transferencia) {
        if (isNullOrEmpty($scope.transferencia.ala)) {
            alertaErro("A ala precisa ser informada.")
            return;
        };
        if (isNullOrEmpty($scope.transferencia.enfermaria)) {
            alertaErro("A enfermaria precisa ser informada.")
            return;
        };
        if (isNullOrEmpty($scope.transferencia.proximoLeito)) {
            alertaErro("O leito precisa ser informado.")
            return;
        };
        if (isNullOrEmpty($scope.transferencia.data)) {
            alertaErro("A data da transferência precisa ser informada.")
            return;
        }

        return true;
    }

}
);
