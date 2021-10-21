/* Se declaran todos los elementos de la calculadora */
const display = {
    screen : {
        op : document.getElementById("operacion"),
        res : document.getElementById("resultado")
    },
    numeros : {
        cero : document.getElementById("0"),
        uno : document.getElementById("1"),
        dos : document.getElementById("2"),
        tres : document.getElementById("3"),
        cuatro : document.getElementById("4"),
        cinco : document.getElementById("5"),
        seis : document.getElementById("6"),
        siete : document.getElementById("7"),
        ocho : document.getElementById("8"),
        nueve : document.getElementById("9"),
        punto : document.getElementById("punto")
    },
    operadores : {
        suma : document.getElementById("suma"),
        resta : document.getElementById("resta"),
        mult : document.getElementById("multiplicacion"),
        div : document.getElementById("division"),
        igual : document.getElementById("igual")
    },
    opciones : {
        limpiar : document.getElementById("limpiarVisor"),
        borrar : document.getElementById("borrarCaract"),
        ans : document.getElementById("res-anterior"),
        historial : document.getElementById("historial")
    }
}
let historial = []
let resultadoAnt
/* Se establecen los eventos */

/* Impresión de los números y símbolos al apretar teclas */
display.numeros.cero.onclick = function(){
    if(display.screen.op.value != "0"){
        display.screen.op.value += "0"
    }
}
display.numeros.uno.onclick = function(){
    display.screen.op.value += "1"
}
display.numeros.dos.onclick = function(){
    display.screen.op.value += "2"
}
display.numeros.tres.onclick = function(){
    display.screen.op.value += "3"
}
display.numeros.cuatro.onclick = function(){
    display.screen.op.value += "4"
}
display.numeros.cinco.onclick = function(){
    display.screen.op.value += "5"
}
display.numeros.seis.onclick = function(){
    display.screen.op.value += "6"
}
display.numeros.siete.onclick = function(){
    display.screen.op.value += "7"
}
display.numeros.ocho.onclick = function(){
    display.screen.op.value += "8"
}
display.numeros.nueve.onclick = function(){
    display.screen.op.value += "9"
}
display.numeros.punto.onclick = function(){
    if(display.screen.op.value[display.screen.op.value.length - 1] != "" && display.screen.op.value != "" && display.screen.op.value[display.screen.op.value.length - 1] != "." && !display.screen.op.value.includes(".")){
        display.screen.op.value += "."
    }
}

/* Eventos para operadores */
/* SUMA */
display.operadores.suma.onclick = function(){
    if(display.screen.op.value != 0 && display.screen.op.value[display.screen.op.value.length - 1] != "+" && display.screen.op.value[display.screen.op.value.length - 1] != "-" && display.screen.op.value[display.screen.op.value.length - 1] != "*" && display.screen.op.value[display.screen.op.value.length - 1] != "/"){
        display.screen.res.value += display.screen.op.value + "+"
        display.screen.op.value = ""
    }
}
/* RESTA */
display.operadores.resta.onclick = function(){
    if(display.screen.op.value[display.screen.op.value.length-1] != "-"){
            if(display.screen.res.value[display.screen.res.value.length - 1] == "-" && display.screen.op.value[0] == undefined){
                console.log("if")
                display.screen.res.value = display.screen.res.value.substring(0, display.screen.res.value.length - 1);
                if(display.screen.res.value[display.screen.res.value.length - 1] != "+" && display.screen.res.value[display.screen.res.value.length - 1] != "/" && display.screen.res.value[display.screen.res.value.length - 1] != "*"){
                    display.screen.res.value += display.screen.op.value + "+" 
                    display.screen.op.value = ""
                }
            }
            else{
                display.screen.res.value += display.screen.op.value + "-" 
                display.screen.op.value = ""
                console.log("else")
            }
    }
}
/* MULTIPLICACIÓN */
display.operadores.mult.onclick = function(){
    if(display.screen.op.value != 0 && display.screen.op.value[display.screen.op.value.length - 1] != "+" && display.screen.op.value[display.screen.op.value.length - 1] != "-" && display.screen.op.value[display.screen.op.value.length - 1] != "*" && display.screen.op.value[display.screen.op.value.length - 1] != "/"){
        display.screen.res.value += display.screen.op.value + "*"
        display.screen.op.value = ""
    }
}
/* DIVISIÓN */
display.operadores.div.onclick = function(){
    if(display.screen.op.value != "" && display.screen.op.value[display.screen.op.value.length - 1] != "+" && display.screen.op.value[display.screen.op.value.length - 1] != "-" && display.screen.op.value[display.screen.op.value.length - 1] != "*" && display.screen.op.value[display.screen.op.value.length - 1] != "/"){
        display.screen.res.value += display.screen.op.value + "/"
        display.screen.op.value = ""
    }
}
/* IGUAL */
display.operadores.igual.onclick = function(){
    display.screen.res.value += display.screen.op.value
    if(eval(display.screen.res.value) == undefined){
        display.screen.op.value = "0"
        resultadoAnt = display.screen.op.value
        display.screen.res.value = ""
    }
    else{
        display.screen.op.value = eval(display.screen.res.value)
        resultadoAnt = display.screen.op.value
        display.screen.res.value = ""
    }
    historial.push(resultadoAnt)
}
/* Eventos para las teclas para borrar caracteres y otras funciones */
display.opciones.borrar.onclick = function(){
    display.screen.op.value = display.screen.op.value.substring(0, display.screen.op.value.length - 1);
}
display.opciones.limpiar.onclick = function(){
    display.screen.op.value = ""
    display.screen.res.value = ""
}
display.opciones.ans.onclick = function(){
    if (resultadoAnt != undefined) {
        display.screen.op.value += resultadoAnt   
    }
}
display.opciones.historial.onclick = function(){
    if(historial[0] != undefined){
        display.screen.res.value = historial
        display.screen.op.value = ""
    }
}
/* Funciones */