let productos = [
    {producto:"buzo adidas", precio:38000, talle:"Xl", color:"celeste", imagen:"img/Enlight6684 (1)-fotor-2024022321226.jpg"},
    {producto:"buzo nike", precio:42000, talle:"S", color:"negro", imagen:"img/Enlight7000-fotor-20240223204856.jpg"},
    {producto:"buzo hornets", precio:30000, talle:"M", color:"celeste", imagen:"img/Enlight6780-1-fotor-20240223203133.jpg"},
    {producto:"conjunto puma", precio:68000, talle:"L", color:"blanco-negro", imagen:"img/Enlight7325-fotor-20240216201912.jpg"},
    {producto:"conjunto nike", precio:70000, talle:"Xl", color:"negro", imagen:"img/Enlight7365-fotor-20240223203325.jpg"},
    {producto:"buzo badbunny", precio:35000, talle:"M", color:"beige", imagen:"img/47115252-0625-4d99-9d3c-3e86f562e440-1-fotor-20240223204710.jpg"},
    {producto:"buzo nikeAir", precio:40000, talle:"xl", color:"beige", imagen:"img/Enlight7206 (1)-fotor-2024022320441.jpg"},
    {producto:"conjunto nikeAir", precio:40000, talle:"L", color:"naranja-gris", imagen:"img/Enlight7366-fotor-20240223204452.jpg"},];

const productoSection = document.getElementById('productos-container');
const buttonSearch = document.getElementById('searchButton');
const buttonError = document.getElementById('searchError');
const searchInput = document.getElementById('searchInput');


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
                    <button>Añadir al carrito</button>
                </div>
            </div>`;
        
        productoSection.appendChild(productoDiv);
    });
}

function searchProducts() {
    const searchText = searchInput.value.toLowerCase();
    const filteredProducts = productos.filter(producto => 
        producto.producto.toLowerCase().includes(searchText) ||
        producto.color.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
}

// Inicialmente mostrar todos los productos
displayProducts(productos);

// Agregar el evento de búsqueda
buttonSearch.addEventListener('click', searchProducts);
 

