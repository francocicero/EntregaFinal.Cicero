const todosLosProductos = `https://dummyjson.com/products?limit=10`;
let informacionNueva;

fetch(todosLosProductos)
.then((respuesta) => respuesta.json())
.then((datos) => {
    informacionNueva = datos;
    fullProductos(informacionNueva.products);
});


const cards = datosFiltrados.reduce((acc, elementos) => {
    const descuento = (elementos.price * elementos.discountPercentage) / 100;
    const precioFinal = elementos.price - descuento;
    return (
        acc +
        `
    <div class="carta" id="producto-${elementos.id}">
    <div class="imagen-carta">
        <img src= "${elementos.images[0]}" class="card-img-top" alt=${elementos.title}>
    </div>
    <div class="card-body">
    <h3> 
        ${elementos.title}
    </h3>
        <p> ${elementos.description} </p>
        <div class="precios">
        <p> $${elementos.price} </p>
        <p> ${elementos.discountPercentage}%OFF
        </div>
        <p>Precio final: $${precioFinal.toFixed(2)} </p>
    </div>
    <div class="boton-comprar"> 
    <button class="comprar-click" id="buttonclick-${elementos.id}">Agregar al carrito</button>
    </div>
    </div> 
    `
    );
    }, "");
    document.querySelector(".carta-todos-productos").innerHTML = cards;







const darkMode = document.querySelector(".modo-oscuro");
const body = document.body;

darkMode.addEventListener("click", cambiarModoColor);

function cambiarModoColor(){
    body.classList.toggle("dark-modee");

    if(document.body.classList.contains("dark-modee")){
        localStorage.setItem(`dark-mode` , `true`);
    } else{
        localStorage.setItem(`dark-mode` , `false`);
    }
    

    if (body.classList.contains("dark-modee")) {
        darkMode.innerHTML = " Modo claro";
    } else {
        darkMode.innerHTML = " Modo oscuro";
    }
}

if(localStorage.getItem (`dark-mode`) === `true`){
    document.body.classList.toggle(`dark-modee`);
} else {
    document.body.classList.remove(`dark-modee`);
}

