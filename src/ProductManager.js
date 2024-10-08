const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.currentId = 1;
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.currentId = this.products.length > 0 ? Math.max(this.products.map(p => p.id)) + 1 : 1;
        }
    }

    addProduct(product) {
        const { title, description, code, price, status, stock, category, thumbnails } = product;

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const codeExists = this.products.some(p => p.code === code);
        if (codeExists) {
            console.log(`Error: El producto con el código ${code} ya existe.`);
            return;
        }

        const newProduct = { id: this.currentId++, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        return product || null;
    }

    updateProduct(id, productData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        const updatedProduct = { ...this.products[index], ...productData };
        this.products[index] = updatedProduct;
        this.saveProducts();
        return updatedProduct;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        this.products.splice(index, 1);
        this.saveProducts();
        return true;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
}

module.exports = ProductManager;
