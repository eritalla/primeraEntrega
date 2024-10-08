const express = require('express');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/carts.json');

// //configuramos middleware para recibir datos en formato json
// app.use(express.urlencoded({ extended: true}));
// app.use(express.json());

// Rutas para Products
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    res.json(productManager.getProducts());
});

productsRouter.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (!product) return res.status(404).send("Not found");
    res.json(product);
});

productsRouter.post('/', (req, res) => {
    const newProduct = productManager.addProduct(req.body);
    if (!newProduct) return res.status(400).send("Error al agregar producto");
    res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (!updatedProduct) return res.status(404).send("Not found");
    res.json(updatedProduct);
});

productsRouter.delete('/:pid', (req, res) => {
    const deleted = productManager.deleteProduct(parseInt(req.params.pid));
    if (!deleted) return res.status(404).send("Not found");
    res.status(204).send();
});

app.use('/api/products', productsRouter);

// Rutas para Carts
const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (!cart) return res.status(404).send("Not found");
    res.json(cart);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const updatedCart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!updatedCart) return res.status(404).send("Not found");
    res.json(updatedCart);
});

app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
