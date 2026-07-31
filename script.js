let loadMoreBtn = document.querySelector("#load-more");
let currenItem = 4;

const productos = [
    {
        id: 1,
        nombre: "Tacos al pastor",
        descripcion: "Carne marinada con piña y especias.",
        precio: 18000,
        imagen: "https://plus.unsplash.com/premium_photo-1681406995086-e60e5c306e6c?q=80&w=687&auto=format&fit=crop"
    },
    {
        id: 2,
        nombre: "Guacamole",
        descripcion: "Aguacate fresco con limón.",
        precio: 14000,
        imagen: "https://plus.unsplash.com/premium_photo-1681406689584-2f7612fa98a4?q=80&w=687&auto=format&fit=crop"
    },
    {
        id: 3,
        nombre: "Enchiladas",
        descripcion: "Tortillas rellenas con salsa tradicional mexicana.",
        precio: 50000,
        imagen: "https://images.pexels.com/photos/35081817/pexels-photo-35081817.jpeg"
    },
    {
        id: 4,
        nombre: "Pozole",
        descripcion: "Caldo típico con maíz.",
        precio: 35000,
        imagen: "https://images.pexels.com/photos/16235561/pexels-photo-16235561.jpeg"
    },
    {
        id: 5,
        nombre: "Quesadillas",
        descripcion: "Rellenas de queso fundido.",
        precio: 16000,
        imagen: "https://images.pexels.com/photos/32351725/pexels-photo-32351725.jpeg"
    },
    {
        id: 6,
        nombre: "Churros",
        descripcion: "Crujientes con nutella.",
        precio: 12000,
        imagen: "https://images.pexels.com/photos/37543728/pexels-photo-37543728.jpeg"
    },
    {
        id: 7,
        nombre: "Molletes",
        descripcion: "Pan con frijoles y queso gratinado.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/31822991/pexels-photo-31822991.jpeg"
    },
    {
        id: 8,
        nombre: "Desayuno Mexicano",
        descripcion: "Huevos, frijoles y tortillas en combo tradicional.",
        precio: 30000,
        imagen: "https://images.pexels.com/photos/28525191/pexels-photo-28525191.jpeg"
    },
    {
        id: 9,
        nombre: "Tacos Caseros",
        descripcion: "Tacos artesanales con ingredientes frescos.",
        precio: 15000,
        imagen: "https://images.pexels.com/photos/17429139/pexels-photo-17429139.jpeg"
    },
    {
        id: 10,
        nombre: "Fajitas de Pollo",
        descripcion: "Pollo a la parrilla con vegetales salteados.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/32371269/pexels-photo-32371269.jpeg"
    }
];

let carrito = [];
const listaProductos = document.getElementById("lista-1");

function mostrarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach((producto, index) => {
        // Los productos cuyo índice sea mayor o igual a 4 se ocultan inicialmente
        let estiloOculto = index >= currenItem ? 'style="display: none;"' : '';
        
        listaProductos.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center box" ${estiloOculto}>
                <div class="card shadow-sm h-100" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${producto.nombre}</h5>
                        <p class="card-text text-muted small">${producto.descripcion}</p>
                        <p class="precio fw-bold text-danger mb-3">$${producto.precio}</p>
                        <a href="#" class="btn btn-warning fw-bold text-dark mt-auto agregar-carrito" data-id="${producto.id}">
                            Agregar al carrito
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

mostrarProductos();

// Lógica del botón Cargar Más
loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll(".box-container .box")];

    for (let i = currenItem; i < currenItem + 4 && i < boxes.length; i++) {
        boxes[i].style.display = "flex";
    }
    currenItem += 4;

    if (currenItem >= boxes.length) {
        loadMoreBtn.style.display = "none";
    }
}

const carritoDOM = document.getElementById("carrito");
const listaelementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
    listaelementos1.addEventListener("click", comprarElemento);
    carritoDOM.addEventListener("click", eliminarElemento);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const id = Number(e.target.dataset.id);
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        insertarCarrito();
    }
}

function insertarCarrito() {
    lista.innerHTML = "";
    carrito.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="50" class="rounded">
            </td>
            <td>
                ${producto.nombre}
            </td>
            <td>
                $${producto.precio}
            </td>
            <td>
                <a href="#" class="borrar text-danger text-decoration-none fw-bold" data-id="${producto.id}">
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
        const id = Number(e.target.dataset.id);
        const indice = carrito.findIndex(
            producto => producto.id === id
        );
        if (indice !== -1) {
            carrito.splice(indice, 1);
        }
        insertarCarrito();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    carrito = [];
    insertarCarrito();
}

const totalCarrito = document.getElementById("total-carrito");

function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });
    totalCarrito.textContent = `$${total}`;
}