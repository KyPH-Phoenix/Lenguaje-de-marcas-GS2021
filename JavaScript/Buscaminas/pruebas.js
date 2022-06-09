function prueba() {
    setInterval(timer, 1000);
}

let segundos = 0;
let minutos = 0;

function timer() {
    segundos++;

    if (segundos == 60) {
        minutos++;
        segundos = 0;
    }

    let imprimirMinutos = minutos;
    let imprimirSegundos = segundos;

    if (minutos < 10) {imprimirMinutos = "0" + minutos;}
    if (segundos < 10) {imprimirSegundos = "0" + segundos;}

    document.getElementById("timer").innerHTML = imprimirMinutos + ":" + imprimirSegundos;
}