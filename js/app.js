let productos = [
    {producto:"buzo adidas", precio:38000, talle:"Xl", color:"celeste", imagen:"img/Enlight6684 (1)-fotor-2024022321226.jpg"},
    {producto:"buzo nike", precio:42000, talle:"S", color:"negro", imagen:"img/Enlight7000-fotor-20240223204856.jpg"},
    {producto:"buzo hornets", precio:30000, talle:"M", color:"celeste", imagen:"img/Enlight6780-1-fotor-20240223203133.jpg"},
    {producto:"conjunto puma", precio:68000, talle:"L", color:"blanco-negro", imagen:"img/Enlight7325-fotor-20240216201912.jpg"},
    {producto:"conjunto nike", precio:70000, talle:"Xl", color:"negro", imagen:"img/Enlight7365-fotor-20240223203325.jpg"},
    {producto:"buzo badbunny", precio:35000, talle:"M", color:"beige", imagen:"img/47115252-0625-4d99-9d3c-3e86f562e440-1-fotor-20240223204710.jpg"},
    {producto:"buzo nikeAir", precio:40000, talle:"xl", color:"beige", imagen:"img/Enlight7206 (1)-fotor-2024022320441.jpg"},
    {producto:"conjunto nikeAir", precio:40000, talle:"L", color:"naranja-gris", imagen:"img/Enlight7366-fotor-20240223204452.jpg"},
];

// Elementos del DOM
const productoSection = document.getElementById('productos-container');
const buttonSearch = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const modalProductos = document.getElementById('productosModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeFooterBtn = document.getElementById('closeFooterBtn');
const cartButton = document.getElementById('cart');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const successMessage = document.getElementById('successMessage');
const noResultsMessage = document.getElementById('noResultsMessage');

// Función para mostrar los productos en la página principal
function displayProducts(productos) {
    productoSection.innerHTML = '';
    productos.map(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('grid-container');
        
        productoDiv.innerHTML = `
            <div class="item">
                <figure>
                    <img src="${producto.imagen}" alt="producto" title="${producto.producto}">
                </figure>
                <div class="info-product">
                    <h2>${producto.producto}</h2>
                    <p class="price">$${producto.precio}</p>
                    <p class="price">Color: ${producto.color}</p>
                    <button onclick="addToCart('${producto.producto}')">Añadir al carrito</button>
                </div>
            </div>`;
        
        productoSection.appendChild(productoDiv);
    });
}

// Función para añadir un producto al carrito
function addToCart(producto) {
    let cart = JSON.parse(localStorage.getItem('productosModal')) || [];
    cart.push(producto);
    localStorage.setItem('productosModal', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el conteo de productos en el carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('productosModal')) || [];
    document.getElementById('cuenta-carrito').innerText = cart.length;
}

// Función para buscar productos
function searchProducts() {
    const searchText = searchInput.value.toLowerCase();
    const filteredProducts = productos.filter(producto => 
        producto.producto.toLowerCase().includes(searchText) ||
        producto.color.toLowerCase().includes(searchText)
    );
    
    if (filteredProducts.length > 0) {
        noResultsMessage.style.display = 'none';
        displayProducts(filteredProducts);
    } else {
        noResultsMessage.style.display = 'block';
        productoSection.innerHTML = '';
    }
}

// Función para abrir el modal de productos
function openModal() {
    modalProductos.style.display = 'block';
    displayModalProducts();
}

// Función para cerrar el modal de productos
function closeModal() {
    modalProductos.style.display = 'none';
}

// Función para borrar productos del carrito
function clearCart() {
    localStorage.removeItem('productosModal');
    displayModalProducts();
    updateCartCount();
    alert('Productos borrados del carrito');
}

// Función para mostrar los productos en el modal
function displayModalProducts() {
    const productosContainer = document.getElementById('productosContainer');
    let cart = JSON.parse(localStorage.getItem('productosModal')) || [];
    productosContainer.innerHTML = '';
    cart.map(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('grid-container');
        
        productoDiv.innerHTML = `
            <div class="item">
                <h2>${producto}</h2>
            </div>`;
        
        productosContainer.appendChild(productoDiv);
    });
}

// Función para finalizar la compra
function checkout() {
    localStorage.removeItem('productosModal');
    displayModalProducts();
    updateCartCount();
    showSuccessMessage();
}

// Función para mostrar el mensaje de éxito
function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000); // Oculta el mensaje después de 3 segundos
}

// Inicialmente mostrar todos los productos
displayProducts(productos);

// Agregar el evento de búsqueda
buttonSearch.addEventListener('click', searchProducts);

// Agregar el evento para abrir el modal
cartButton.addEventListener('click', openModal);

// Agregar el evento para cerrar el modal
closeModalBtn.addEventListener('click', closeModal);
closeFooterBtn.addEventListener('click', closeModal);

// Agregar el evento para borrar productos del carrito
clearCartBtn.addEventListener('click', clearCart);

// Agregar el evento para finalizar la compra
checkoutBtn.addEventListener('click', checkout);

// Actualizar el conteo del carrito
updateCartCount();

document.addEventListener("DOMContentLoaded", function() {
    const bannerContainer = document.getElementById("bannerContainer");
    
    const bannerHTML = `
        <div class="banner">
            <div class="banner-container">
                <img src="img/12-fotor-2024030611265.png" alt="banner" class="banner-image">
                <div class="banner-text">
                    <h1>Tienda De Ropa</h1>
                    <p>La culpa de gastar, se acaba al estrenar.</p>
                </div>
            </div>
        </div>
    `;
    
    bannerContainer.innerHTML = bannerHTML;
});
