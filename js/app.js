// Productos
const productos = [
    { id: "1", categoria: "unisex", producto: "buzo adidas", descripcion: "Buzo cómodo y a la moda", precio: 38000, talle: "Xl", color: "celeste", imagen: "img/Enlight6684 (1)-fotor-2024022321226.jpg" },
    { id: "2", categoria: "hombre", producto: "buzo nike", descripcion: "Buzo deportivo y casual", precio: 42000, talle: "S", color: "negro", imagen: "img/Enlight7000-fotor-20240223204856.jpg" },
    { id: "3", categoria: "unisex", producto: "buzo hornets", descripcion: "Buzo estilo Hornets", precio: 30000, talle: "M", color: "celeste", imagen: "img/Enlight6780-1-fotor-20240223203133.jpg" },
    { id: "4", categoria: "hombre", producto: "conjunto puma", descripcion: "Conjunto deportivo Puma", precio: 68000, talle: "L", color: "blanco-negro", imagen: "img/Enlight7325-fotor-20240216201912.jpg" },
    { id: "5", categoria: "hombre", producto: "conjunto nike", descripcion: "Conjunto deportivo Nike", precio: 70000, talle: "Xl", color: "negro", imagen: "img/Enlight7365-fotor-20240223203325.jpg" },
    { id: "6", categoria: "mujer", producto: "buzo badbunny", descripcion: "Buzo Bad Bunny", precio: 35000, talle: "M", color: "beige", imagen: "img/47115252-0625-4d99-9d3c-3e86f562e440-1-fotor-20240223204710.jpg" },
    { id: "7", categoria: "mujer", producto: "buzo nikeAir", descripcion: "Buzo Nike Air", precio: 40000, talle: "xl", color: "beige", imagen: "img/Enlight7206 (1)-fotor-2024022320441.jpg" },
    { id: "8", categoria: "unisex", producto: "conjunto nikeAir", descripcion: "Conjunto Nike Air", precio: 40000, talle: "L", color: "naranja-gris", imagen: "img/Enlight7366-fotor-20240223204452.jpg" }
];

// Elementos del DOM
const elements = {
    productoSection: document.getElementById('productos-container'),
    buttonSearch: document.getElementById('searchButton'),
    searchInput: document.getElementById('searchInput'),
    modalProductos: document.getElementById('productosModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    closeFooterBtn: document.getElementById('closeFooterBtn'),
    cartButton: document.getElementById('cart'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    successMessage: document.getElementById('successMessage'),
    noResultsMessage: document.getElementById('noResultsMessage'),
    montoCarrito: document.getElementById('monto-carrito'),
    checkoutModal: document.getElementById('checkoutModal'),
    closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
    cancelCheckoutBtn: document.getElementById('cancelCheckoutBtn'),
    checkoutForm: document.getElementById('checkoutForm'),
    paymentMethodSelect: document.getElementById('paymentMethod'),
    paymentInstallments: document.getElementById('paymentInstallments')
};

// Función para renderizar productos en el DOM
function renderProducts(products) {
    elements.productoSection.innerHTML = products.map(product => 
        `<div class="grid-container">
            <div class="item">
                <figure>
                    <img src="${product.imagen}" alt="${product.producto}" title="${product.producto}">
                </figure>
                <div class="info-product">
                    <h2>${product.producto}</h2>
                    <p>${product.descripcion}</p>
                    <p class="price">$${product.precio}</p>
                    <p class="price">Color: ${product.color}</p>
                    <p class="price">Categoría: ${product.categoria}</p>
                    <button onclick="addToCart('${product.id}')">Añadir al carrito</button>
                </div>
            </div>
        </div>`
    ).join('');
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = productos.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    Swal.fire({
        title: 'Producto añadido al carrito',
        text: `${product.producto} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cuenta-carrito').textContent = cartCount;
}

// Búsqueda de productos
elements.buttonSearch.addEventListener('click', () => {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const filteredProducts = productos.filter(product => 
        product.producto.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm) ||
        product.categoria.toLowerCase().includes(searchTerm) ||
        product.color.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
    elements.noResultsMessage.style.display = filteredProducts.length > 0 ? 'none' : 'block';
});

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productos);
    updateCartCount();
});

// Verificar existencia de elementos antes de añadir eventos
if (elements.cartButton) {
    elements.cartButton.addEventListener('click', () => {
        elements.modalProductos.style.display = 'block';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        renderCartProducts(cart);
    });
}

if (elements.closeModalBtn) {
    elements.closeModalBtn.addEventListener('click', () => {
        elements.modalProductos.style.display = 'none';
    });
}

if (elements.closeFooterBtn) {
    elements.closeFooterBtn.addEventListener('click', () => {
        elements.modalProductos.style.display = 'none';
    });
}

if (elements.clearCartBtn) {
    elements.clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        updateCartCount();
        renderCartProducts([]);
    });
}

if (elements.checkoutBtn) {
    elements.checkoutBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para finalizar la compra.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            elements.modalProductos.style.display = 'none';
            Swal.fire({
                title: 'Compra finalizada',
                text: 'Gracias por su compra.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                localStorage.removeItem('cart');
                updateCartCount();
                renderCartProducts([]);
            });
        }
    });
}

// Función para renderizar productos en el carrito
function renderCartProducts(cartProducts) {
    const cartContainer = document.getElementById('productosContainer');
    if (cartContainer) {
        cartContainer.innerHTML = cartProducts.map(product => 
            `<div class="grid-container">
                <div class="item">
                    <figure>
                        <img src="${product.imagen}" alt="${product.producto}" title="${product.producto}">
                    </figure>
                    <div class="info-product">
                        <h2>${product.producto}</h2>
                        <p>${product.descripcion}</p>
                        <p class="price">$${product.precio}</p>
                        <p class="price">Color: ${product.color}</p>
                        <p class="price">Categoría: ${product.categoria}</p>
                    </div>
                </div>
            </div>`
        ).join('');
    }
}
