/* Se declaran todos los elementos de la calculadora */
let valorAnterior = document.getElementById("valorAnterior"), valorActual = document.getElementById("valorActual") ,numeros = document.querySelectorAll(".numero"), operadores = document.querySelectorAll(".operador"), limpiar = document.getElementById("limpiarPantalla"), borrar = document.getElementById("borrarCaract"), ans = document.getElementById("res-anterior"), historial = document.getElementById("historial"), stringValorAnterior = "", stringValorActual = "", operationType = undefined, ultimoRes = undefined;
const simbolos = {
    sumar : '+', restar : '-', multiplicar : '*', dividir : '/'
}, ultimoValorAnterior = valorAnterior.value[valorAnterior.value.length - 1], ultimoValorActual = valorActual.value[valorActual.value.length - 1];
numeros.forEach(btn => {
    btn.addEventListener("click", ()=>{
        escribirNumero(btn.innerHTML)
    })
})
operadores.forEach(btn => {
    btn.addEventListener("click", ()=>{
        escribirOperador(btn.value)
    })
})
/* Impresión de los números y símbolos al apretar teclas */
function escribirNumero(valor){
    if(valor == "." && (stringValorActual.includes('.') || stringValorActual == '')){return}
    if(valor == "ANS" && !isNaN(ultimoRes)){
        if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.dividir){
            valor = ultimoRes
            stringValorActual = stringValorActual.toString() + valor.toString()
        }
        else{
            if(stringValorActual != ''){
                valor = ultimoRes
                stringValorAnterior += stringValorActual + '*'
                stringValorActual = ''
            }
            else{
                valor = simbolos.multiplicar + ultimoRes
            }
            stringValorActual = stringValorActual.toString() + valor.toString()
        }
    }
    else{
        stringValorActual = stringValorActual.toString() + valor.toString()
    }
    imprimirValor()
}

/* Eventos para operadores */
function escribirOperador(type){
    if(type == undefined) return
    operationType = type
    switch (operationType) {
        case 'igual': calcular();return;
        case 'restar':
            if(stringValorActual == '' && stringValorAnterior == ''){
                console.log("Valor actual está vacio")
                stringValorAnterior+=simbolos[operationType]
            }
            else if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.dividir){
                console.log("else if 1")
                stringValorAnterior += stringValorActual + simbolos[type]
                stringValorActual = ''
            }
            else if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar || (stringValorAnterior[stringValorAnterior.length - 2] != simbolos.sumar || [stringValorAnterior.length - 2] != simbolos.multiplicar || [stringValorAnterior.length - 2] != simbolos.dividir)){
                console.log("else if 2")
                if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar && stringValorActual == ''){
                    console.log("reemplazo del -")
                    stringValorAnterior = stringValorAnterior.slice(0,-1)
                    operationType = 'sumar'
                }
                else if((stringValorAnterior[stringValorAnterior.length - 2] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 2] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 2] == simbolos.dividir) && stringValorActual == ''){return}
                verificarOperador(operationType)
            }
            else{
                console.log("else")
                verificarOperador(operationType)
            }
            break;
        default:verificarOperador(operationType);break;
        }
    imprimirValor()
}
/* Eventos para las teclas para borrar caracteres y otras funciones */
limpiar.onclick = limpiarPantalla
borrar.onclick = borrarCaract
function imprimirValor(){
    /* console.log(stringValorActual + " VALOR ACTUAL")
    console.log(stringValorAnterior + " VALOR ANTERIOR") */
    valorActual.value = stringValorActual
    valorAnterior.value = stringValorAnterior
}
function limpiarPantalla(){
    stringValorActual = ""
    stringValorAnterior = ""
    operationType = undefined
    imprimirValor()
}
function borrarCaract(){
    stringValorActual = stringValorActual.slice(0,-1)
    imprimirValor()
}
function verificarOperador(type){
    if((stringValorAnterior == '' && stringValorActual == '') || (stringValorAnterior == '-' && stringValorActual == '')){return}
    else{
        if((stringValorAnterior[stringValorAnterior.length-1] == simbolos.sumar || (stringValorAnterior[stringValorAnterior.length-1] == simbolos.restar) || stringValorAnterior[stringValorAnterior.length-1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length-1] == simbolos.dividir) && stringValorActual == ''){
            if(stringValorAnterior[stringValorAnterior.length-2] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length-2] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length-2] == simbolos.dividir && stringValorAnterior[stringValorAnterior.length-2] == undefined /* || stringValorActual == '' */){return}
            console.log("reemplazo de operador")
            stringValorAnterior = stringValorAnterior.slice(0,-1)
        }
    } 
    stringValorAnterior += stringValorActual + simbolos[type]
    stringValorActual = ''
}
function calcular(){
    if(stringValorAnterior == '' || stringValorActual == '') return /* No se realiza ninguna operación */
    const operacion = stringValorAnterior + stringValorActual
    stringValorAnterior = operacion
    stringValorActual = eval(operacion)
    ultimoRes = stringValorActual
    imprimirValor()
    stringValorAnterior = ''
}