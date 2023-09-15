document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;

    if (nombre === '') {
    alert("Nombre y apelido incompleto")
    return;
    }

    if (!/^\d{7,}$/.test(telefono)) {
    alert("El número ingresado es inválido, debe contener solo dígitos y tener más de 7 dígitos")
    return;
    }
    

    });

    document.querySelector(".form").reset();


const darkMode = document.querySelector(".modo-oscuro");
const body = document.body;

darkMode.addEventListener("click", cambiarModoColor)

function cambiarModoColor(){
    body.classList.toggle("dark-modee");
    darkMode.classList.toggle(`active`);

    if(document.body.classList.contains("dark-modee")){
        localStorage.setItem(`dark-mode` , `true`);
    } else{
        localStorage.setItem(`dark-mode` , `false`);
    }



    if (body.classList.contains("dark-modee")) {
        darkMode.innerHTML = " Modo claro "

    } else {
        darkMode.innerHTML = " Modo oscuro";
    }
}

if(localStorage.getItem (`dark-mode`) === `true`){
    document.body.classList.toggle(`dark-modee`);
    darkMode.classList.toggle(`active`);
} else {
    document.body.classList.remove(`dark-modee`);
}

