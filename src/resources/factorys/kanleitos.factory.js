var local = window.location.hostname;
var DEV = "https://dev-kanleitos-service.azurewebsites.net/kanleitos/";
var HJK = "https://kanleitoshjk-service.azurewebsites.net/";



//var URL_REQ = "http://localhost:9000/kanleitos/";

URL_REQ = DEV

if (local == "dev-kanleitos.azurewebsites.net")
    URL_REQ = DEV;

if (local == "kanleitoshjk.azurewebsites.net")
    URL_REQ = HJK;


var kanHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

//Factorys
app.factory('alasFactory', function ($http) {
    var alas = {};
    //Get alas
    alas.getAlas = function (status) {
        return $http({
            url: URL_REQ + "alas",
            method: 'GET',
            params: { ativo: status },
            kanHeaders
        });
    };

    //Alterar status da ala
    alas.alterarStatus = function(idAla){
        return $http({
            url: URL_REQ + "alas/alterarStatus",
            method: 'PUT',
            params: {idAla: idAla},
            kanHeaders
        });
    };

    return alas;
});

app.factory('enfermariaFactory', function ($http) {
    var enfermarias = {};
    //Get Enfermarias
    enfermarias.getEnfermarias = function (status) {
        return $http({
            url: URL_REQ + "enfermarias",
            method: 'GET',
            params: { ativo: status },
            kanHeaders
        });
    };

    //Get Enfermarias By Ala
    
    enfermarias.getEnfermariasByAlas = function (idAla, status) {
        return $http({
            url: URL_REQ + "enfermariasByAla",
            method: 'GET',
            params: { idAla: idAla, ativo: status },
            kanHeaders
        });
    };

        //Alterar status da enfermaria
        enfermarias.alterarStatus = function(idEnfermaria){
            return $http({
                url: URL_REQ + "enfermaria/alterarStatus",
                method: 'PUT',
                params: { idEnfermaria: idEnfermaria},
                kanHeaders
            });
        };

    return enfermarias;
});

app.factory('leitoFactory', function ($http) {
    var leitos = {};
    //Get Leitos
    leitos.getLeitos = function () {
        return $http({
            url: URL_REQ + "leitos",
            method: 'GET',
            kanHeaders
        });
    };
    leitos.getLeitoEnfermaria = function (idEnfermaria, status) {
        return $http({
            url: URL_REQ + "leitosEnfermarias",
            method: 'GET',
            params: { idEnfermaria: idEnfermaria, ativo: status },
            kanHeaders
        });
    };
    return leitos;
});
app.factory('diagnosticosFactory', function ($http) {
    var diagnosticos = {};
    //Get Diagnosticos
    diagnosticos.getDiagnosticos = function () {
        return $http({
            url: URL_REQ + "diagnosticos",
            method: 'GET',
            kanHeaders
        });
    };
    return diagnosticos;
});
app.factory('pacienteFactory', function ($http) {
    var pacientes = {};
    //Get Pacientes
    pacientes.getPacientes = function () {
        return $http({
            url: URL_REQ + "pacientes",
            method: 'GET',
            kanHeaders
        });
    };
    //Get Paciente pelo numProntuario ou nomeMae
    pacientes.getPaciente = function (prontuario, mae) {
        return $http({
            url: URL_REQ + "paciente",
            method: 'GET',
            params: { numProntuario: prontuario, nomeMae: mae },
            kanHeaders
        });
    };
    //Salvar Pacientes
    pacientes.savePaciente = function (dados) {
        return $http({
            url: URL_REQ + "paciente",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    return pacientes;
});

app.factory('dataAdmissaoFactory', function ($http) {
    var dataAdmissao = {};
    //Get Data Admissao
    dataAdmissao.getDataAdmissao = function () {
        return $http({
            url: URL_REQ + "dataAdmissao",
            method: 'GET',
            kanHeaders
        });
    };
    return dataAdmissao;
});
app.factory('tempoEsperaFactory', function ($http) {
    var tempoEspera = {};
    //Get Tempo de Espera
    tempoEspera.getTempoEspera = function () {
        return $http({
            url: URL_REQ + "tempoEspera",
            method: 'GET',
            kanHeaders
        });
    };
    return tempoEspera;
});


app.factory('pedidoInternacaoFactory', function ($http) {
    var pedido = {};
    //Salvar Pedido Internacao
    pedido.savePedidoInternacao = function (dados) {
        return $http({
            url: URL_REQ + "pedidoInternacao",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    pedido.getPedido = function (prontuario) {
        return $http.get(URL_REQ + 'pedidoInternacao/' + prontuario);
    };
    pedido.getPedidosEmAberto = function (filtros) {
        return $http({
            url: URL_REQ + "pedidosEmAberto",
            data: filtros,
            method: 'POST',
            kanHeaders
        });
    };
    return pedido;
});
app.factory('registroInternacaoFactory', function ($http) {
    var registro = {};
    //Salvar Registro Internacao
    registro.saveRegistroInternacao = function (dados) {
        return $http({
            url: URL_REQ + "registroInternacao",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };

    registro.getRegistrosInternacoes = function (filtros) {
        return $http({
            url: URL_REQ + "pacientesInternados",
            method: 'POST',
            data: filtros,
            kanHeaders
        });
    };

    registro.finalizarInternacao = function (dados) {
        return $http.post(
            URL_REQ + "encerrarInternacao",
            dados,
            kanHeaders
        )
    }
    return registro;
});

app.factory('usuarioFactory', function ($http) {
    var usuario = {};
    usuario.login = function (dados) {
        return $http({
            url: URL_REQ + "login",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    return usuario;
});

app.factory("kanbanFactory", function ($http) {
    var kanban = {};
    kanban.getRegistrosPorClassificação = function (tipoClassificacao) {
        return $http({
            url: URL_REQ + "kanbanInternacoes",
            method: 'GET',
            params: { classificacao: "" + tipoClassificacao },
            kanHeaders
        });
    }

    kanban.atualizaRegistrosInternacao = function (tipoClassificacao) {
        return $http({
            url: URL_REQ + "atualizarInternacoes",
            method: 'GET',
            kanHeaders
        });
    }

    return kanban;
});

app.factory('svcExame', function ($http) {
    var exame = {};
    //Cadastro de Exame
    exame.cadastrarExame = function (exame) {
        return $http.post(
            URL_REQ + "exame",
            exame,
            kanHeaders
        )
    };
    //Get Exames
    exame.getExames = function () {
        return $http.get(
            URL_REQ + "exames",
            kanHeaders
        )
    };
    //Editar Exame
    exame.updateExame = function (exame, idExame) {
        return $http.put(
            URL_REQ + "exame",
            exame,
            {
                kanHeaders,
                params: { idExame: idExame }
            }
        )
    }
    //Inativar Exame
    exame.inativarExame = function (idExame) {
        return $http.post(
            URL_REQ + "inativarExame",
            idExame,
            kanHeaders
        )
    }

    //Ativar Exame
    exame.ativarExame = function (idExame) {
        return $http.post(
            URL_REQ + "ativarExame",
            idExame,
            kanHeaders
        )
    }

    return exame;
});

app.factory('svcIsolamento', function ($http) {
    var isolamento = {};
    //Cadastro de Isolamento
    isolamento.cadastrarIsolamento = function (isolamento) {
        return $http.post(
            URL_REQ + "isolamento",
            isolamento,
            kanHeaders
        )
    };
    //Get Isolamentos
    isolamento.getIsolamentos = function () {
        return $http.get(
            URL_REQ + "isolamentos",
            kanHeaders
        )
    };
    //Editar Isolamento
    isolamento.updateIsolamento = function (isolamento, idIsolamento) {
        return $http.put(
            URL_REQ + "isolamento",
            isolamento,
            {
                kanHeaders,
                params: { idIsolamento: idIsolamento }
            }
        )
    }
    //Inativar Isolamento
    isolamento.inativarIsolamento = function (idIsolamento) {
        return $http.post(
            URL_REQ + "inativarIsolamento",
            idIsolamento,
            kanHeaders
        )
    }

    //Ativar Isolamento
    isolamento.ativarIsolamento = function (idIsolamento) {
        return $http.post(
            URL_REQ + "ativarIsolamento",
            idIsolamento,
            kanHeaders
        )
    }

    //Verificar Isolamentos de uma Enfermaria
    isolamento.getIsolamentosByEnfermaria = function (idEnfermaria) {
        return $http.get(
            URL_REQ + "isolamentosPedidosConcluidos",
            {
                kanHeaders,
                params: { idEnfermaria: idEnfermaria }
            }
        )
    }



    return isolamento;
});

app.factory('svcHospital', function ($http) {
    var hospital = {};
    //Cadastro de Hospital
    hospital.cadastrarHospital = function (hospital) {
        return $http.post(
            URL_REQ + "hospital",
            hospital,
            kanHeaders
        )
    };
    //Get Hospitais
    hospital.getHospitais = function () {
        return $http.get(
            URL_REQ + "hospitais",
            kanHeaders
        )
    };
    //Editar Hospital
    hospital.updateHospital = function (hospital, idHospital) {
        return $http.put(
            URL_REQ + "hospital",
            hospital,
            {
                kanHeaders,
                params: { idHospital: idHospital }
            }
        )
    }
    //Inativar Hospital
    hospital.inativarHospital = function (idHospital) {
        return $http.post(
            URL_REQ + "inativarHospital",
            idHospital,
            kanHeaders
        )
    }
    //Ativar Hospital
    hospital.ativarHospital = function (idHospital) {
        return $http.post(
            URL_REQ + "ativarHospital",
            idHospital,
            kanHeaders
        )
    }
    return hospital;
});


app.factory('svcTipoPendencia', function ($http) {
    var tipoPendencia = {};

    tipoPendencia.cadastrarTipoPendencia = function (tipoPendencia) {
        return $http.post(
            URL_REQ + "tipoPendencia",
            tipoPendencia,
            kanHeaders
        )
    };

    tipoPendencia.getTiposPendencias = function (status) {
        return $http.get(
            URL_REQ + "tipoPendencia",
            {
                kanHeaders,
                params: { inativo: status }
            }
        )
    };

    tipoPendencia.updateTipoPendencia = function (tipoPendencia) {
        return $http.put(
            URL_REQ + "tipoPendencia",
            tipoPendencia,
            kanHeaders
        )
    }

    tipoPendencia.alterarStatus = function (idTipoPendencia) {
        return $http({
            url: URL_REQ + "tipoPendencia/alterarStatus",
            method: 'PUT',
            params: { idTipoPendencia: idTipoPendencia },
            kanHeaders
        });
    }

    return tipoPendencia;
});

app.factory('svcFuncionario', function ($http) {
    var funcionario = {};

    funcionario.cadastrarFuncionario = function (funcionario) {
        return $http.post(
            URL_REQ + "funcionario",
            funcionario,
            kanHeaders
        )
    };

    funcionario.getFuncionarios = function (status) {
        return $http.get(
            URL_REQ + "funcionario",
            {
                kanHeaders,
                params: { inativo: status }
            }
        )
    };

    funcionario.updateFuncionario = function (funcionario) {
        return $http.put(
            URL_REQ + "funcionario",
            funcionario,
            kanHeaders
        )
    }

    funcionario.alterarStatus = function (idFuncionario) {
        return $http({
            url: URL_REQ + "funcionario/alterarStatus",
            method: 'PUT',
            params: { idFuncionario: idFuncionario },
            kanHeaders
        });
    }

    return funcionario;
});