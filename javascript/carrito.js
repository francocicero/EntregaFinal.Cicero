const productoSeleccionado = JSON.parse(
    localStorage.getItem("productoSeleccionado")
);

const tarjetaCarrito = document.querySelector(".carta-todo-carrito");

function mostrarCarritoVacio() {
    tarjetaCarrito.innerHTML = `
    <div class="containerVacio">
    <h2 class="tittulo-carro-vacio"> Carrito vacio...</h2>
    <div class="enlaceYBoton">
        <a href="productos.html">
        <button class="dirigirAProductos">Ir a productos</button>
        </a>
    </div>
    </div>
`;
}


function generarTarjetasProductos() {
    let cardsACarrito = "";
    productoSeleccionado.forEach((product) => {
        const descuento = (product.price * product.discountPercentage) / 100;
        const precioFinal = product.price - descuento;

        cardsACarrito += `
    <div class="cardsCarro" id="producto-${product.id}">
        <div class="carta-img-carrito">
        <img src= ${product.images[0]} alt=${product.title}>
        </div>
        <div class="info-carro">
            <h2> 
            ${product.title}
            </h2>
            <div class="precios">
            <p class="original-price"> $${product.price} </p>
            <p> ${product.discountPercentage}%OFF
            </div>
            <p> $${precioFinal.toFixed(2)} </p>
            <p class="description"> ${product.description} </p>
            <div class="eventos">
            <button class="delete">Eliminar</button>
            <button class="comprarAhora">Comprar ahora</button>
            </div>
    </div>
    </div> 
    `;
    });

    return cardsACarrito;
}

function generarResumenCarrito() {
    let totalProductos = 0;
    let precioTotal = 0;

    productoSeleccionado.forEach((product) => {
        const descuento = (product.price * product.discountPercentage) / 100;
        const precioFinal = product.price - descuento;
        totalProductos += 1;
        precioTotal += precioFinal;
    });
    const resumenCarrito = `
    <div class="todoResumen">
        <h2 class="resumen">
            Resumen de la compra
        </h2>
        <div class="informacionResumen">
        <p> Total productos: (${totalProductos})</p>
        <p> Precio total: $${precioTotal.toFixed(2)}
        <button class="eliminarTodo">Vaciar carrito</button>
        </div>
        <div class="botonResumen">
            <button class="finaliz-compra">Finalizar compra</button>
            <a href="productos.html">
            <button class="verMasProdu">Agregar mas Productos</button>
            </a>
        </div>
    </div>
    `;

    return resumenCarrito;
}

function agregarEventosBotones() {
    // eliminar todo lo que esta en el carro
    document.querySelector(".eliminarTodo").addEventListener("click", () => {
        localStorage.removeItem("productoSeleccionado");
        mostrarCarritoVacio();
    });

    // eliminar una tarjeta de compra no mas
    document.querySelectorAll(".delete").forEach((button, index) => {
        button.addEventListener("click", () => {
            let data = JSON.parse(localStorage.getItem("productoSeleccionado"));

            data.splice(index, 1);

            localStorage.setItem("productoSeleccionado", JSON.stringify(data));

            location.reload();
        });
    });

    // comprar todo lo que haya en carro
    document.querySelector(".finaliz-compra").addEventListener("click", () => {
        localStorage.removeItem("productoSeleccionado");
        Toastify({
            text: "Compra exitosa",
            className: "info",
            grabity: "top",
            position: "right",
            style: { background: "radial-gradient(circle, rgba(83,75,180,1) 0%, rgba(197,246,234,1) 100%)"},
        }).showToast();

        setTimeout(() => {
            location.reload();
        }, 4000);
    });

    // comprar un solo producto
    document.querySelectorAll(".comprarAhora").forEach((button, index) => {
        button.addEventListener("click", () => {
            Toastify({
                text: "Compra exitosa",
                className: "info",
                grabity: "top",
                position: "center",
                style: { background: "radial-gradient(circle, rgba(83,75,180,1) 0%, rgba(197,246,234,1) 100%)" },
            }).showToast();

            let data = JSON.parse(localStorage.getItem("productoSeleccionado"));
            data.splice(index, 1);
            localStorage.setItem("productoSeleccionado", JSON.stringify(data));

            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    });
}

// ver si el carrito tiene tarjetas
if (!productoSeleccionado || productoSeleccionado.length === 0) {
    mostrarCarritoVacio();
} else {
    tarjetaCarrito.innerHTML = generarTarjetasProductos();
    tarjetaCarrito.innerHTML += generarResumenCarrito();
    agregarEventosBotones();
}

// activar modo oscurooo

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

