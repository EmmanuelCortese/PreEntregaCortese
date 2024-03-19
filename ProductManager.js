const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.error('Error loading products:', err);
            this.products = [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error('Error saving products:', err);
        }
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

        product.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        this.products.push(product);
        this.saveProducts();
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

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

const productManager = new ProductManager('products.json');

// Prueba en consola
console.log("Agregando productos...");
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

console.log("Todos los productos:");
console.log(productManager.getProducts());

console.log("Actualizando producto con ID 1...");
productManager.updateProduct(1, { price: 12 });

console.log("Producto actualizado:");
console.log(productManager.getProductById(1));

console.log("Eliminando producto con ID 2...");
productManager.deleteProduct(2);

console.log("Productos después de eliminar:");
console.log(productManager.getProducts());

module.exports = ProductManager;