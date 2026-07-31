let loadMoreBtn = document.querySelector("#load-more")
let currenItem = 4;

const productos = [
   {
        id:1,
        nombre: "Enchiladas",
        descripcion: "Tortillas rellenas con salsa tradicional mexicana.",
        precio: 50000,
        imagen: "https://images.pexels.com/photos/35081817/pexels-photo-35081817.jpeg"
    },
    {
        id:2,
        nombre: "Molletes",
        descripcion: "Pan con frijoles y queso gratinado.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/31822991/pexels-photo-31822991.jpeg"
    },
    {
        id:3,
        nombre: "Desayuno Mexicano",
        descripcion: "Huevos, frijoles y tortillas en combo tradicional.",
        precio: 30000,
        imagen: "https://images.pexels.com/photos/28525191/pexels-photo-28525191.jpeg"
    },
    {
        id:4,
        nombre: "Tacos Caseros",
        descripcion: "Tacos artesanales con ingredientes frescos.",
        precio: 15000,
        imagen: "https://images.pexels.com/photos/17429139/pexels-photo-17429139.jpeg"
    },
    {
        id:5,
        nombre: "Fajitas de Pollo",
        descripcion: "Pollo a la parrilla con vegetales salteados.",
        precio: 20000,
        imagen: "https://images.pexels.com/photos/32371269/pexels-photo-32371269.jpeg"
    }
];

let carrito = [];

const listaProductos = document.getElementById("lista-1");

// seleccion del dom div de productos
function mostrarProductos() {

    listaProductos.innerHTML = "";
    productos.forEach(producto => {
        listaProductos.innerHTML += `
            <div class="box">
                <img src="${producto.imagen}" alt="">
                <div class="products-txt">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="precio">$${producto.precio}</p>
                    <a href="#"
                        class="agregar-carrito btn-3"
                        data-id="${producto.id}">
                        Agregar al carrito
                    </a>
                </div>
            </div>
        `;
    });
}

mostrarProductos();

//boton para ver mas en productos
loadMoreBtn.onclick =() =>{
    let boxes = [...document.querySelectorAll(".box-container .box")];

    for (let i = currenItem; i < currenItem + 4 && i < boxes.length; i++) {
    boxes[i].style.display = "inline-block";
    }
    currenItem +=4;

    if (currenItem >= boxes.length){
        loadMoreBtn.style.display = "none"
    }
}
//carrito de compra
const carritoDOM = document.getElementById("carrito");
const listaelementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners(){
    listaelementos1.addEventListener("click",comprarElemento);
    carritoDOM.addEventListener("click",eliminarElemento);
    vaciarCarritoBtn.addEventListener("click",vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const id = Number(e.target.dataset.id);
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        insertarCarrito();
    }
}

function insertarCarrito(){

    lista.innerHTML = "";
    carrito.forEach(producto =>{

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>

            <td>
                ${producto.nombre}
            </td>
            <td>
                $${producto.precio}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">
                    X
                </a>
            </td>
        `;
        lista.appendChild(row);
    });
    calcularTotal();
}

function eliminarElemento(e){
    e.preventDefault();

    if(e.target.classList.contains("borrar")){
        const id = Number(e.target.dataset.id);

        const indice = carrito.findIndex(
            producto => producto.id === id
        );
        if(indice !== -1){
            carrito.splice(indice, 1);
        }insertarCarrito();
    }
}

function vaciarCarrito(){
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