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