class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            console.error("El código del producto ya existe.");
            return;
        }

        product.id = this.idCounter++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
        }
        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10,
    thumbnail: "ruta/imagen1.jpg",
    code: "ABC123",
    stock: 20
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 15,
    thumbnail: "ruta/imagen2.jpg",
    code: "DEF456",
    stock: 15
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));