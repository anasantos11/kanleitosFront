function calcularDiasDiferenca(dataAtual, dataPassada) {
    var tempo = {};

    var data1 = moment(dataAtual, "DD/MM/YYYY hh:mm");
    var data2 = moment(dataPassada, "DD/MM/YYYY hh:mm");

    var dias = data1.diff(data2, 'days');
    var horas = data1.diff(data2, 'hours');
    var minutos = data1.diff(data2, 'minutes');
    var segundos = data1.diff(data2, 'seconds');

    tempo.dias = dias;

    return tempo;
};

function isNullOrEmpty(entrada){
    if(entrada == undefined || entrada == "")
        return true;
}

function alertaPreenchimentoCampo(campo){
    swal({
        html: 'O campo <span class="font-weight-bold">' + campo +  '</span> não foi informado.',
        type: 'error',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 5000
    })

}

function alertaErroRequisicao(err) {
    if (err.status == 400 && err.data.messages != undefined) {
        swal({
            text: err.data.messages[0],
            type: 'error',
            showConfirmButton: false,
            timer: 5000
        })
    } else {
        err.data != undefined ? console.log(err.data.message) : "";
        swal({
            text: 'Desculpe, não conseguimos processar sua solicitação. Verifique os dados e tente novamente.',
            type: 'error',
            showConfirmButton: false,
            timer: 5000
        })
    }
};

function alertaConfirmarExclusao(acao) {
    var title = acao == undefined ? "excluir" : acao;
    return swal({
        html: 'Tem certeza que deseja <br /> <span class="font-weight-bold">' +  title +  '</span> ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Prosseguir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
};
