class Display {
    constructor(screenTop, screenBottom){
        this.screenTop = screenTop
        this.screenBottom = screenBottom
        this.calculadora = new Calculadora()
        this.operationType = undefined
        this.operacion = ""
        this.escritura = ""
        this.simbolos = {
            sumar : "+",
            restar : "-",
            multiplicar : "x",
            dividir : "÷",
/*             coseno : "cos()",
            arcocoseno : "acos()",
            seno : "sin()",
            arcoseno : "asin()",
            tangente : "tan()",
            arcotangente : "atan()" */
        }
    }
    limpiarPantalla(){
        this.escritura = ""
        this.operacion = ""
        this.operationType = undefined
        this.imprimirValor()
    }
    borrarCaract(){
        this.escritura = this.escritura.toString().slice(0,-1)
        this.imprimirValor()
    }
    imprimirNumero(numero){
        if(numero == "." && this.escritura.includes('.')){return}
        this.escritura = this.escritura.toString() + numero.toString()
        this.imprimirValor()
    }
    imprimirValor(){
        this.screenBottom.value = this.escritura
        this.screenTop.value = `${this.operacion} ${this.simbolos[this.operationType] || ''}`
    }
    calcular(){
        const operacion = parseFloat(this.operacion)
        const escritura = parseFloat(this.escritura)
        if(isNaN(escritura) || isNaN(operacion)){return} /* No se realiza ninguna operación */
        else{this.escritura = this.calculadora[this.operationType](operacion, escritura)}
    }
    computar(type){
        this.operationType !== "igual" && this.calcular()
        this.operationType = type
        this.operacion = this.escritura || this.operacion
        this.escritura = ""
        this.imprimirValor()
    }
}