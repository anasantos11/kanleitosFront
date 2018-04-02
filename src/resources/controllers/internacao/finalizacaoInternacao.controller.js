app.controller('FinalizacaoInternacaoController', ["$filter", "svcHospital", "Notify",
    function ($filter, svcHospital, Notify) {
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
            return Notify.openModal("templates/relatorios/listaRegistroInternacao.html", null, "95%")
                .closePromise.then((registroInternacao) => {
                    if (!registroInternacao.value || registroInternacao.value === '$document' || registroInternacao.value === '$closeButton') {
                        return
                    } else {
                        vm.finalizacaoInternacao.registroInternacao = registroInternacao.value;
                        vm.finalizacaoInternacao.registroInternacao.pedidoInternacao.dataAdmissao = new Date(vm.registroInternacao.pedidoInternacao.dataAdmissao);
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
                vm.finalizacaoInternacao.dataAlta = moment(vm.finalizacaoInternacao.dataAlta).format();

                if (vm.finalizacaoInternacao.motivoEvasao == "Transferência") {
                    vm.finalizacaoInternacao.hospital = vm.hospitais.filter(function (obj) {
                        return (obj.id_hospital == vm.finalizacaoInternacao.idHospital)
                    })
                }

                registroInternacaoFactory.finalizarInternacao(vm.finalizacaoInternacao)
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
