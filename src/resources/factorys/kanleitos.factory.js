var local = window.location.hostname;
var DEV = "https://dev-kanleitos-service.azurewebsites.net/";
var HJK = "https://kanleitoshjk-service.azurewebsites.net/";


var URL_REQ = DEV;
//var URL_REQ = "http://localhost:9090/";

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
    alas.getAlas = function () {
        return $http({
            url: URL_REQ + "Alas",
            method: 'GET',
            kanHeaders
        });
    };
    return alas;
});

app.factory('enfermariaFactory', function ($http) {
    var enfermarias = {};
    //Get Enfermarias
    enfermarias.getEnfermarias = function () {
        return $http({
            url: URL_REQ + "Enfermarias",
            method: 'GET',
            kanHeaders
        });
    };

    //Get Enfermarias By Ala

    enfermarias.getEnfermariasByAlas = function (idAla) {
        return $http({
            url: URL_REQ + "GetEnfermariasByAlas",
            method: 'GET',
            params: { idAla: idAla },
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
            url: URL_REQ + "Leitos",
            method: 'GET',
            kanHeaders
        });
    };
    leitos.getLeitoEnfermaria = function (idEnfermaria) {
        return $http({
            url: URL_REQ + "GetLeitosEnfermaria",
            method: 'GET',
            params: { idEnfermaria: idEnfermaria },
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
            url: URL_REQ + "Diagnosticos",
            method: 'GET',
            kanHeaders
        });
    };
    return diagnosticos;
});
app.factory('pacienteFactory', function ($http) {
    var pacientes = {};
    //Get Diagnosticos
    pacientes.getPacientes = function () {
        return $http({
            url: URL_REQ + "ListaPacientes",
            method: 'GET',
            kanHeaders
        });
    };
    //Get Paciente pelo numProntuario ou nomeMae
    pacientes.getPaciente = function (prontuario, mae) {
        return $http({
            url: URL_REQ + "Paciente",
            method: 'GET',
            params: { numProntuario: prontuario, nomeMae: mae },
            kanHeaders
        });
    };
    //Salvar Pacientes
    pacientes.savePaciente = function (dados) {
        return $http({
            url: URL_REQ + "CadastroPaciente",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    return pacientes;
});
app.factory('pedidoInternacaoFactory', function ($http) {
    var pedido = {};
    //Salvar Pedido Internacao
    pedido.savePedidoInternacao = function (dados) {
        return $http({
            url: URL_REQ + "PedidoInternacao",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    pedido.getPedido = function (prontuario) {
        return $http({
            url: URL_REQ + "GetPedidoInternacao",
            method: 'GET',
            params: { numProntuario: prontuario },
            kanHeaders
        });
    };
    pedido.getPedidosEmAberto = function () {
        return $http({
            url: URL_REQ + "PedidosEmAberto",
            method: 'GET',
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
            url: URL_REQ + "RegistroInternacao",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };
    return registro;
});

app.factory('usuarioFactory', function ($http) {
    var usuario = {};
    usuario.login = function (dados) {
        return $http({
            url: URL_REQ + "Login",
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
            url: URL_REQ + "KanbanInternacoes",
            method: 'GET',
            params: { classificacao: "" + tipoClassificacao },
            kanHeaders
        });
    }

    kanban.atualizaRegistrosInternacao = function (tipoClassificacao) {
        return $http({
            url: URL_REQ + "AtualizarInternacoes",
            method: 'GET',
            kanHeaders
        });
    }

    return kanban;
})