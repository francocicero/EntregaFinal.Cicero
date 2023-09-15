const todosLosProductos = `https://dummyjson.com/products?limit=0`;
let informacionNueva;

fetch(todosLosProductos)
.then((respuesta) => respuesta.json())
.then((datos) => {
    informacionNueva = datos;
    fullProductos(informacionNueva.products);
});


const fullProductos = (datos, orden) => {
    const datosFiltrados = datos.filter(
    (dato) =>
        dato.category !== "skincare" &&
        dato.category !== "groceries" &&
        dato.category !== "tops" &&
        dato.category !== "womens-dresses" &&
        dato.category !== "womens-shoes" &&
        dato.category !== "womens-jewellery" &&
        dato.category !== "lighting"
    );

    datosFiltrados.sort((a, b) => {
    if (orden === 'asc') {
        return a.title.localeCompare(b.title);
    } else if (orden === 'desc') {
        return b.title.localeCompare(a.title);
    } else {
        return 0;
    }
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

    // button para comprar
    document.querySelectorAll(".boton-comprar").forEach((button, index) => {
    button.addEventListener("click", () => {
        const productoSeleccionado =
        JSON.parse(localStorage.getItem("productoSeleccionado")) || [];

        productoSeleccionado.push(datosFiltrados[index]);

        localStorage.setItem(
        "productoSeleccionado",
        JSON.stringify(productoSeleccionado)
        )
        window.location.href = "carrito.html";
    })
    })

    // ordenar az/za
    document.getElementById('orden').addEventListener('change', function() {
    var orden = this.value;
    fullProductos(informacionNueva.products, orden);
    });

};


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





