var local = window.location.hostname;
var DEV = "https://dev-kanleitos-service.azurewebsites.net/kanleitos/";
var HJK = "https://kanleitoshjk-service.azurewebsites.net/";



var URL_REQ = "http://localhost:9000/kanleitos/";

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
    alas.getAlas = function () {
        return $http({
            url: URL_REQ + "alas",
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
            url: URL_REQ + "enfermarias",
            method: 'GET',
            kanHeaders
        });
    };

    //Get Enfermarias By Ala

    enfermarias.getEnfermariasByAlas = function (idAla) {
        return $http({
            url: URL_REQ + "enfermariasByAla",
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
            url: URL_REQ + "leitos",
            method: 'GET',
            kanHeaders
        });
    };
    leitos.getLeitoEnfermaria = function (idEnfermaria) {
        return $http({
            url: URL_REQ + "leitosEnfermarias",
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
            url: URL_REQ + "diagnosticos",
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
        return $http({
            url: URL_REQ + "pedidoInternacao",
            method: 'GET',
            params: { numProntuario: prontuario },
            kanHeaders
        });
    };
    pedido.getPedidosEmAberto = function () {
        return $http({
            url: URL_REQ + "pedidosEmAberto",
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
            url: URL_REQ + "registroInternacao",
            method: 'POST',
            data: dados,
            kanHeaders
        });
    };

    registro.getRegistrosInternacoes = function(){
        return $http({
            url: URL_REQ + "pacientesInternados",
            method: 'GET',
            kanHeaders
        });
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
})