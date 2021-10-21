var numClicked;
var ecuacion = [];

function mostrarNumero() {
    juntarNumeros();
    document.getElementById("cajaCalculadora").value = ecuacion;
}
function juntarNumeros() {
    for (let i = 0; i < ecuacion.length; i++) {
        if (!isNaN(ecuacion[i + 1])) {
            ecuacion.push(parseInt(String(ecuacion[i]) + String(ecuacion[i + 1])));
            console.log(i)
        }
    }
}
function error(){
    alert("Error TuT: No configurado D:")
}
function limpiar() {
    ecuacion = [];
    document.getElementById("cajaCalculadora").value = "";
}