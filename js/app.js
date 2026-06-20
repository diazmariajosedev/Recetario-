document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();

    document.getElementById('categorias').addEventListener('change', (e) => {
        const categoriaSeleccionada = e.target.value; 
        cargarProductos(categoriaSeleccionada);
    })
});

function cargarCategorias() {
    const listaCategorias = document.getElementById('categorias');
    fetch('https://dummyjson.com/products/categories')
        .then(respuesta => respuesta.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                listaCategorias.appendChild(new Option(categoria.name, categoria.slug));
            }) 
            cargarProductos(categoria[0].slug);
        }) 
}  

function cargarProductos(categoria) {
    const listaProductos = document.getElementById('listaProductos');
    fetch(`https://dummyjson.com/products/category/${categoria}`) 
        .then(respuesta => respuesta.json()) 
        .then(productos => {
            listaProductos.innerHTML = '';
            productos.products.forEach(producto => {
                const tarjetaProducto = document.createElement('div');
                tarjetaProducto.classList.add('card'); // Agremamos la clase al elemento HTML
                tarjetaProducto.classList.add('card-text-description')
                tarjetaProducto.innerHTML = 
                `<img src="${producto.thumbnail}" "alt=${producto.title}" />
                <div>
                    <h3 class="card-text-title">${producto.title}</h3
                    <p>${producto.description}</p>
                    <h4 class="price">Price: ${producto.price}</h4>
                </div>
                `;
                listaProductos.appendChild(tarjetaProducto);
            }); 
        })
}