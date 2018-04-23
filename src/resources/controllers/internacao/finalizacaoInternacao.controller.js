app.controller('FinalizacaoInternacaoController', ["$filter", "svcHospital", "registroInternacaoFactory","Notify",
    function ($filter, svcHospital, registroInternacaoFactory, Notify) {
        var vm = this;

        vm.novaFinalizacaoInternacao = function () {
            vm.finalizacaoInternacao = {
                registroInternacao: {},
                dataAlta: new Date(),
                motivoEvasao: null,
                idHospital: null
            }
        };

        vm.novaFinalizacaoInternacao();

        vm.openModalPesquisaRegistroInternacao = function () {
            return Notify.openModal("templates/relatorios/listaRegistrosInternacaoAbertos.html", null, "95%")
                .closePromise.then((registroInternacao) => {
                    if (!registroInternacao.value || registroInternacao.value === '$document' || registroInternacao.value === '$closeButton') {
                        return
                    } else {
                        vm.finalizacaoInternacao.registroInternacao = registroInternacao.value;
                        vm.finalizacaoInternacao.registroInternacao.pedidoInternacao.dataAdmissao = new Date(registroInternacao.value.pedidoInternacao.dataAdmissao);
                    }
                })
        };

        vm.carregarHospitais = function () {
            if (vm.finalizacaoInternacao.motivoEvasao == "Transferência") {
                svcHospital.getHospitais()
                    .then(function (res) {
                        vm.hospitais = res.data.data;
                    })
            }
        };

        vm.finalizarInternacao = function () {
            if (vm.validarFinalizacaoInternacao()) {

                var  obj = {};
                obj.dataFinalizacao = moment(vm.finalizacaoInternacao.dataAlta).format();
                obj.status = vm.finalizacaoInternacao.motivoEvasao;
                obj.idRegistroInternacao = vm.finalizacaoInternacao.registroInternacao.idRegistroInternacao;
                obj.idLeito = vm.finalizacaoInternacao.registroInternacao.leito.idLeito;
                obj.idHospital = vm.finalizacaoInternacao.idHospital;

                registroInternacaoFactory.finalizarInternacao(obj)
                    .then(function (response) {
                        alertaSucesso("Finalização de internação realizada com sucesso")
                        vm.novaFinalizacaoInternacao();
                    })
                    .catch(function (err) {
                        vm.finalizacaoInternacao.dataAlta = new Date(vm.finalizacaoInternacao.dataAlta);
                        vm.registroInternacao.previsaoAlta = new Date(vm.registroInternacao.previsaoAlta);
                        alertaErroRequisicao(err);
                    }

                    );
            }
        };


        vm.validarFinalizacaoInternacao = function () {
            if (isNullOrEmpty(vm.finalizacaoInternacao.registroInternacao)) {
                alertaErro("Não foi informado o paciente que deseja finalizar a internação.")
                return;
            }

            if (isNullOrEmpty(vm.finalizacaoInternacao.dataAlta)) {
                alertaPreenchimentoCampo("data da finalização")
                return;
            }

            if (isNullOrEmpty(vm.finalizacaoInternacao.motivoEvasao)) {
                alertaPreenchimentoCampo("motivo da evasão")
                return;
            }

            if (vm.finalizacaoInternacao.motivoEvasao == "Transferência" && isNullOrEmpty(vm.finalizacaoInternacao.idHospital)) {
                alertaPreenchimentoCampo("hospital")
                return;
            }

            return true;
        };
    }]);
