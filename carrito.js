document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

async function cargarCarrito() {
    try {
        const response = await fetch(`http://localhost:8080/api/carrito/`);
        const data = await response.json();

        pintarCarrito(data);
        actualizarResumen(data);

    } catch (error) {
        console.error("Error cargando carrito:", error);
    }
}

function pintarCarrito(lineas) {
    const contenedor = document.getElementById("cart-list");
    contenedor.innerHTML = "";

    lineas.forEach(linea => {
        const articulo = linea.idArticulo;

        const html = `
            <article class="cart-item">
                <img src="assets/img/${articulo.modelo}.webp">

                <div>
                    <h2>${articulo.modelo}</h2>
                    <p>${articulo.descripcion}</p>

                    <p><strong>Precio unitario:</strong> ${linea.precioUnidad} €</p>

                    <p class="qty-static">
                        <strong>Cantidad:</strong> ${linea.cantidad}
                    </p>

                    <button class="btn btn-secondary btn-mas" data-nombre="${articulo.modelo}">+</button>
                    <button class="btn btn-secondary btn-menos" data-nombre="${articulo.modelo}">-</button>
                    <button class="btn btn-danger btn-borrar" data-nombre="${articulo.modelo}">Eliminar</button>
                </div>

                <p class="price">${linea.precioTotal} €</p>
            </article>
        `;

        contenedor.innerHTML += html;
    });

    activarEventos();
}

function activarEventos() {

    const boton = document.getElementById("btn fin-compra");

    boton.addEventListener("click", () => {
        localStorage.setItem("precio",document.getElementById("precio-fin").textContent);
        window.location.href = "checkout.html";
    });

    document.querySelectorAll(".btn-mas").forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombre = btn.dataset.nombre;
            await actualizarCantidad(nombre, 1);
        });
    });

    document.querySelectorAll(".btn-menos").forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombre = btn.dataset.nombre;
            await actualizarCantidad(nombre, -1);
        });
    });

    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombre = btn.dataset.nombre;
            await borrarArticulo(nombre);
        });
    });
}

async function actualizarCantidad(nombre, incremento) {
    try {
        await fetch(`http://localhost:8080/api/carrito/${nombre}/incremento/${incremento}`, {
            method: "PUT"
        });

        cargarCarrito();

    } catch (error) {
        console.error("Error actualizando cantidad:", error);
    }
}

async function borrarArticulo(nombre) {
    try {
        await fetch(`http://localhost:8080/api/carrito/borrar/${nombre}`, {
            method: "DELETE"
        });

        cargarCarrito();

    } catch (error) {
        console.error("Error borrando:", error);
    }
}

function actualizarResumen(lineas) {
    let subtotal = 0;

    lineas.forEach(l => {
        subtotal += l.precioTotal;
    });

    const descuento = 10;
    const total = subtotal - descuento;

    document.querySelector(".summary-line span:last-child").textContent = `${subtotal} €`;
    document.querySelector(".summary-line.total span:last-child").textContent = `${total} €`;
}