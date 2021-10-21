/* Se declaran todos los elementos de la calculadora */
let valorAnterior = document.getElementById("operacion"), valorActual = document.getElementById("resultado") ,numeros = document.querySelectorAll(".numero"), operadores = document.querySelectorAll(".operador"), limpiar = document.getElementById("limpiarVisor"), borrar = document.getElementById("borrarCaract"), ans = document.getElementById("res-anterior"), historial = document.getElementById("historial"), stringValorAnterior = "", stringValorActual = "", operationType = undefined;
const simbolos = {
    sumar : '+', restar : '-', multiplicar : 'x', dividir : '÷'
} 

/* Impresión de los números y símbolos al apretar teclas */
numeros.forEach(btn => {
    escribirNumero(btn.innerHTML)
})
operadores.forEach(btn => {
    
})
/* Eventos para operadores */
function computar(type){
    operationType !== "igual" && calcular()
    operationType = type
    operacion = stringValorActual || stringValorAnterior
    stringValorActual = ""
    imprimirValor()
}
/* Eventos para las teclas para borrar caracteres y otras funciones */

/* Funciones */
function escribirNumero(valor){
    if(valor == "." && stringValorActual.includes('.')){return}
        stringValorActual = stringValorActual.toString() + valor.toString()
        imprimirValor()
}
function imprimirValor(){
    valorActual.value = stringValorActual
    valorAnterior.value = `${stringValorAnterior} ${simbolos[operationType] || ''}`
}