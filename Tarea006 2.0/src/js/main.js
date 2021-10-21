const screentop = document.getElementById("screenTop")
const screenbottom = document.getElementById("screenBottom")
const tecla_numeros = document.querySelectorAll(".numero")
const tecla_operadores = document.querySelectorAll(".operador")

const estructura = new Display(screentop,screenbottom)

tecla_numeros.forEach(tecla => {
    tecla.addEventListener("click", ()=>{
        estructura.imprimirNumero(tecla.innerHTML)
    })
})
tecla_operadores.forEach(tecla => {
    tecla.addEventListener("click",()=>{
        estructura.computar(tecla.value)
    })
})