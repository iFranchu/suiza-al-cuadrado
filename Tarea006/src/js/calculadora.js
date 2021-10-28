/* Se declaran todos los elementos de la calculadora */
let valorAnterior = document.getElementById("valorAnterior"), valorActual = document.getElementById("valorActual") ,numeros = document.querySelectorAll(".numero"), operadores = document.querySelectorAll(".operador"), f_trigonometricas = document.querySelectorAll('.f-trig'), limpiar = document.getElementById("limpiarPantalla"), borrar = document.getElementById("borrarCaract"), ans = document.getElementById("res-anterior"), historial = document.getElementById("historial"), stringValorAnterior = "", stringValorActual = "", operationType = undefined, ultimoRes = undefined, historialResultados = [], lastOperationType = undefined, btnFactorial = document.getElementById("btnFactorial");
const simbolos = {
    sumar : '+', restar : '-', multiplicar : '*', dividir : '/'
}
/* Se establecen los eventos para cada tecla */
numeros.forEach(btn => {
    btn.addEventListener("click", ()=>{
        escribirNumero(btn.innerHTML);
    })
})
operadores.forEach(btn => {
    btn.addEventListener("click", ()=>{
        escribirOperador(btn.value);
    })
})
f_trigonometricas.forEach(btn => {
    btn.addEventListener("click", ()=>{
        trigonometria(btn.value);
    })
})
historial.addEventListener("click", ()=>{
    verHistorial();
})
btnFactorial.addEventListener("click", ()=>{
    factorizarNumero();
})
calcularButton.addEventListener("click", ()=>{
    funcionLineal();
})

/* Impresión de los números y símbolos al apretar teclas */
function escribirNumero(valor){
    if(valor == "." && (stringValorActual.includes('.') || stringValorActual == '')) return;
    if(valor != 'ANS' && operationType == 'igual'){
        stringValorActual = '';
        stringValorAnterior = '';
        operationType = undefined;
    }
    if(valor == "ANS"){
        if(ultimoRes == undefined) return;
        if((stringValorAnterior[stringValorAnterior.length - 1] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.dividir) && stringValorActual == ''){
            valor = ultimoRes;
            stringValorActual = stringValorActual.toString() + valor.toString();
        }
        else{
            if(stringValorActual != ''){
                valor = ultimoRes;
                stringValorAnterior += stringValorActual + '*';
                stringValorActual = '';
            }
            else{
                if(stringValorAnterior != '') valor = simbolos.multiplicar + ultimoRes;
                else valor = ultimoRes;
            }
            stringValorActual = stringValorActual.toString() + valor.toString();
        }
    }
    else{
        stringValorActual = stringValorActual.toString() + valor.toString();
    }
    imprimirValor();
}

/* Eventos para operadores */
function escribirOperador(type){
    if(type == undefined) return;
    operationType = type;
    switch (operationType) {
        case 'igual': calcular();return;
        case 'restar':
            if(stringValorActual == '' && stringValorAnterior == '') stringValorAnterior+=simbolos[operationType]
            else if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 1] == simbolos.dividir){
                stringValorAnterior += stringValorActual + simbolos[type];
                stringValorActual = '';
            }
            else if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar || (stringValorAnterior[stringValorAnterior.length - 2] != simbolos.sumar || [stringValorAnterior.length - 2] != simbolos.multiplicar || [stringValorAnterior.length - 2] != simbolos.dividir)){
                if(stringValorAnterior[stringValorAnterior.length - 1] == simbolos.restar && stringValorActual == ''){
                    stringValorAnterior = stringValorAnterior.slice(0,-1);
                    operationType = 'sumar';
                }
                else if((stringValorAnterior[stringValorAnterior.length - 2] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length - 2] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length - 2] == simbolos.dividir) && stringValorActual == ''){
                    return;
                }
                verificarOperador(operationType);
            }
            else verificarOperador(operationType); break;
        default:verificarOperador(operationType);break;
        }
    imprimirValor();
}
/* Funciones y eventos para otras teclas */
limpiar.onclick = limpiarPantalla;
borrar.onclick = borrarCaract;

function imprimirValor(){
    valorActual.value = stringValorActual;
    valorAnterior.value = stringValorAnterior;
}
function limpiarPantalla(){
    stringValorActual = "";
    stringValorAnterior = "";
    operationType = undefined;
    imprimirValor();
}
function borrarCaract(){
    stringValorActual = stringValorActual.slice(0,-1);
    imprimirValor();
}
function verificarOperador(type){
    if((stringValorAnterior == '' && stringValorActual == '') || (stringValorAnterior == '-' && stringValorActual == '')){return;}
    else{
        if((stringValorAnterior[stringValorAnterior.length-1] == simbolos.sumar || (stringValorAnterior[stringValorAnterior.length-1] == simbolos.restar) || stringValorAnterior[stringValorAnterior.length-1] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length-1] == simbolos.dividir) && stringValorActual == ''){
            if(stringValorAnterior[stringValorAnterior.length-2] == simbolos.sumar || stringValorAnterior[stringValorAnterior.length-2] == simbolos.multiplicar || stringValorAnterior[stringValorAnterior.length-2] == simbolos.dividir && stringValorAnterior[stringValorAnterior.length-2] == undefined){return}
            stringValorAnterior = stringValorAnterior.slice(0,-1)
        }
    } 
    stringValorAnterior += stringValorActual + simbolos[type];
    stringValorActual = '';
}
function calcular(){
    if(stringValorAnterior == '' || stringValorActual == '') return; /* No se realiza ninguna operación */
    const operacion = stringValorAnterior + stringValorActual;
    stringValorAnterior = operacion;
    if(isNaN(eval(operacion)) || eval(operacion) == Infinity){
        stringValorActual = 'Syntax ERROR';
        imprimirValor();
        stringValorActual = '';
        stringValorAnterior = '';
        return;
    }
    else{
    stringValorActual = eval(operacion);
    ultimoRes = stringValorActual;
    historialResultados.push(ultimoRes);
    }
    imprimirValor();
    stringValorAnterior = '';
}
function verHistorial(){
    if(historialResultados[0] == undefined) return;
    stringValorAnterior = historialResultados.toString();
    stringValorActual = '';
    imprimirValor();
    stringValorActual = '';
    stringValorAnterior = '';
}
function trigonometria(type){
    if(stringValorActual == '') return;
    if(stringValorActual != '' && stringValorAnterior != '') calcular();
    switch (type) {
        case 'cos':
            if(Math.cos(parseFloat(stringValorActual)) == Math.cos(90)) stringValorActual = '0'; /* Javascript hace cosas raras cuando calcula el coseno de 90, así que hice esto */
            else stringValorActual =  Math[type](degrees_to_radians(parseFloat(stringValorActual)));
            break;
        case 'acos':
            if(parseFloat(stringValorActual) > 1 || parseFloat(stringValorActual) < -57){stringValorAnterior = '';imprimirValor(); return;}
            else stringValorActual =  Math[type](degrees_to_radians(parseFloat(stringValorActual)));
        case 'asin':
            if(parseFloat(stringValorActual) > 57.2 || parseFloat(stringValorActual) < -57.2){stringValorAnterior = '';imprimirValor(); return;}
            else stringValorActual =  Math[type](degrees_to_radians(parseFloat(stringValorActual)));
    }
    stringValorActual =  Math[type](degrees_to_radians(parseFloat(stringValorActual)));
    imprimirValor();
    stringValorActual = '';
    stringValorAnterior = '';
}

function radians_to_degrees(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}
function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

function factorizarNumero() {
    if (valorActual.value == "") {
        return;
    }
    else if(valorActual.value == "Syntax Error"){
        limpiarPantalla();

        return;
    }else if (valorActual.value == "Infinity") {
        valorActual.value = "Syntax ERROR";
        valorAnterior.value = "Infinity" + "!";

        stringValorActual = "";
        stringValorAnterior = "";

        return;
    }

    valFactorizar = String(valorActual.value);
    stringValorActual = parseInt(valorActual.value);
    var factorial = 1;

    for( var i=stringValorActual ; i>0 ; i-- ){
        factorial = factorial * i;
    }

    stringValorAnterior = valorActual.value + "!"
    stringValorActual = String(factorial);
    imprimirValor();
    
    stringValorActual = "";
    stringValorAnterior = "";
}
function funcionLineal(){
    var inputPendiente = document.getElementById("input-pendiente").value;
    var inputOrdenada = document.getElementById("input-ordenada").value;

    if (inputPendiente == "") {
        var valorA_FL = 1;
        inputPendiente = 1;
    }else{
        var valorA_FL = parseInt(inputPendiente);
    }
    var valorB_FL = parseInt(inputOrdenada);

    if (inputOrdenada != "" && inputPendiente == "0" && !isNaN(valorB_FL)) {
        if (inputOrdenada == 0) {
            document.getElementById("AO__Number").innerHTML = valorA_FL;
            document.getElementById("OO__Number").innerHTML = valorB_FL;
        }else if (inputOrdenada != 0) {
            document.getElementById("AO__Number").innerHTML = "Not";
            document.getElementById("OO__Number").innerHTML = valorB_FL;
        }

        document.getElementById("IN__Number").innerHTML = "Not";
        document.getElementById("IP__Number").innerHTML = "Not";
        document.getElementById("FType").innerHTML = "Constante";
        
    }else if (inputOrdenada == "0" && inputPendiente != "" && !isNaN(valorA_FL)) {
            document.getElementById("AO__Number").innerHTML = valorA_FL;
            document.getElementById("OO__Number").innerHTML = valorB_FL;

        document.getElementById("FType").innerHTML = "Constante";
        
    }else if (inputOrdenada != "" && inputPendiente != "" && !isNaN(valorA_FL) && !isNaN(valorB_FL)) {
        document.getElementById("AO__Number").innerHTML = valorB_FL/valorA_FL;
        document.getElementById("OO__Number").innerHTML = valorB_FL;

        document.getElementById("IN__Number").innerHTML = "(-∞;" + valorB_FL/valorA_FL + ")";
        document.getElementById("IP__Number").innerHTML = "(" + valorB_FL/valorA_FL + ";+∞)";

        if (valorA_FL > 0) document.getElementById("FType").innerHTML = "Creciente";
        else if (valorA_FL < 0) document.getElementById("FType").innerHTML = "Decreciente";
        else if (valorA_FL == 0) document.getElementById("FType").innerHTML = "Constante";

    }else if(inputOrdenada == "" && inputPendiente != "" && !isNaN(valorA_FL)){
        document.getElementById("AO__Number").innerHTML = valorA_FL;
        document.getElementById("OO__Number").innerHTML = 0;

        document.getElementById("IN__Number").innerHTML = "(-∞;" + valorA_FL + ")";
        document.getElementById("IP__Number").innerHTML = "(" + valorA_FL + ";+∞)";
        
        if (valorA_FL > 0) document.getElementById("FType").innerHTML = "Creciente";
        else if (valorA_FL < 0) document.getElementById("FType").innerHTML = "Decreciente";
        else if (valorA_FL == 0) document.getElementById("FType").innerHTML = "Constante";
    }
}