const btnAlternarCalculadora = document.querySelectorAll(".goToFunction"), calculadora = document.querySelector(".calculadora"), contFuncion = document.querySelector(".contenedor-funcion");

btnAlternarCalculadora.forEach(btn => {
    btn.addEventListener("click", ()=>{
        calculadora.classList.toggle("invisible");
        calculadora.classList.toggle("position-fixed");
        contFuncion.classList.toggle("invisible");
        contFuncion.classList.toggle("position-fixed");
    })
});