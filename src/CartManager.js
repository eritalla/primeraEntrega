const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.currentId = 1;
        this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            this.currentId = this.carts.length > 0 ? Math.max(this.carts.map(cart => cart.id)) + 1 : 1;
        }
    }

    addCart() {
        const newCart = { id: this.currentId++, products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        const cart = this.carts.find(c => c.id === id);
        return cart || null;
    }

    addProductToCart(cid, pid) {
        const cart = this.getCartById(cid);
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product === pid);
            if (productIndex > -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            this.saveCarts();
            return cart;
        }
        return null;
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
}

module.exports = CartManager;
