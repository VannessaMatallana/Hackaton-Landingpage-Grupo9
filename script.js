let loadMoreBtn = document.querySelector("#load-more");
let currenItem = 4;

const productos = [
    {
        id: 1,
        nombre: "Enchiladas",
        descripcion: "Tortillas rellenas con salsa tradicional mexicana.",
        precio: 50000,
        imagen: "https://images.pexels.com/photos/35081817/pexels-photo-35081817.jpeg"
    },
    {
        id: 2,
        nombre: "Molletes",
        descripcion: "Pan con frijoles y queso gratinado.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/31822991/pexels-photo-31822991.jpeg"
    },
    {
        id: 3,
        nombre: "Desayuno Mexicano",
        descripcion: "Huevos, frijoles y tortillas en combo tradicional.",
        precio: 30000,
        imagen: "https://images.pexels.com/photos/28525191/pexels-photo-28525191.jpeg"
    },
    {
        id: 4,
        nombre: "Tacos Caseros",
        descripcion: "Tacos artesanales con ingredientes frescos.",
        precio: 15000,
        imagen: "https://images.pexels.com/photos/17429139/pexels-photo-17429139.jpeg"
    },
    {
        id: 5,
        nombre: "Fajitas de Pollo",
        descripcion: "Pollo a la parrilla con vegetales salteados.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/32371269/pexels-photo-32371269.jpeg"
    }
];

let carrito = JSON.parse(localStorage.getItem("carritoComidas")) || [];

const listaProductos = document.getElementById("lista-1");
const carritoDOM = document.getElementById("carrito");
const cartIcon = document.getElementById("cart-icon");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const totalCarrito = document.getElementById("total-carrito");

function mostrarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach((producto, index) => {
        const esVisible = index < currenItem ? "block" : "none";
        listaProductos.innerHTML += `
            <div class="col-md-6 col-lg-4 box" style="display: ${esVisible};">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text text-muted small">${producto.descripcion}</p>
                        </div>
                        <div>
                            <p class="fw-bold text-success fs-5 mb-2">$${producto.precio}</p>
                            <a href="#" class="btn btn-warning w-100 agregar-carrito fw-semibold" data-id="${producto.id}">
                                Agregar al carrito
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (loadMoreBtn && currenItem >= productos.length) {
        loadMoreBtn.style.display = "none";
    }
}

mostrarProductos();

if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll("#lista-1 .box")];

        for (let i = currenItem; i < currenItem + 4 && i < boxes.length; i++) {
            boxes[i].style.display = "block";
        }
        currenItem += 4;

        if (currenItem >= boxes.length) {
            loadMoreBtn.style.display = "none";
        }
    };
}

cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener("click", comprarElemento);
    carritoDOM.addEventListener("click", eliminarElemento);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    if (cartIcon) {
        cartIcon.addEventListener("click", (e) => {
            e.preventDefault();
            carritoDOM.classList.toggle("d-none");
        });
    }

    document.addEventListener("DOMContentLoaded", insertarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const id = Number(e.target.dataset.id);
        const producto = productos.find(p => p.id === id);

        if (producto) {
            carrito.push(producto);
            guardarCarritoStorage();
            insertarCarrito();
            aplicarAnimacionAgregar(e.target);
        }
    }
}

function insertarCarrito() {
    lista.innerHTML = "";
    carrito.forEach((producto, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="50" height="50" class="rounded object-fit-cover">
            </td>
            <td class="align-middle small fw-semibold">
                ${producto.nombre}
            </td>
            <td class="align-middle small">
                $${producto.precio}
            </td>
            <td class="align-middle">
                <a href="#" class="btn btn-sm btn-outline-danger borrar p-0 px-2" data-index="${index}">
                    X
                </a>
            </td>
        `;
        lista.appendChild(row);
    });

    calcularTotal();
}

function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar")) {
        const indice = Number(e.target.dataset.index);

        if (indice !== -1 && indice < carrito.length) {
            carrito.splice(indice, 1);
            guardarCarritoStorage();
            insertarCarrito();
        }
    }
}

function vaciarCarrito(e) {
    if (e) e.preventDefault();
    carrito = [];
    guardarCarritoStorage();
    insertarCarrito();
}

function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });

    if (totalCarrito) {
        totalCarrito.textContent = `$${total}`;
    }
}

function guardarCarritoStorage() {
    localStorage.setItem("carritoComidas", JSON.stringify(carrito));
}

function aplicarAnimacionAgregar(elemento) {
    elemento.style.transition = "transform 0.15s ease-in-out";
    elemento.style.transform = "scale(0.95)";

    setTimeout(() => {
        elemento.style.transform = "scale(1)";
    }, 150);
}
