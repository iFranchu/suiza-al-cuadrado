const btnAlternarCalculadora = document.querySelectorAll(".goToFunction"), calculadora = document.querySelector(".calculadora"), contFuncion = document.querySelector(".contenedor-funcion");

let infoAbscisas = document.getElementById("info-abscisas"), infoOrdenada = document.getElementById("info-ordenada"), direccionFuncion = document.getElementById("direccion-funcion"), intervaloPositivo = document.getElementById("info-intervalo+"), intervaloNegativo = document.getElementById("info-intervalo-"); 

btnAlternarCalculadora.forEach(btn => {
    btn.addEventListener("click", ()=>{
        calculadora.classList.toggle("invisible");
        calculadora.classList.toggle("position-fixed");
        contFuncion.classList.toggle("invisible");
        contFuncion.classList.toggle("position-fixed");
    })
});