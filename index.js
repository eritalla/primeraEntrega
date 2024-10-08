const ProductManager = require('./ProductManager'); // Importar la clase solo una vez

const manager = new ProductManager(); // Crear una instancia de ProductManager

// Agregar productos de ejemplo
manager.addProduct({
    title: "Laptop",
    description: "Laptop con 16GB de RAM y 512GB SSD",
    price: 1500,
    thumbnail: "ruta/laptop.png",
    code: "LAP123",
    stock: 5
});

manager.addProduct({
    title: "Teléfono",
    description: "Teléfono móvil con cámara de 64MP",
    price: 800,
    thumbnail: "ruta/telefono.png",
    code: "TEL456",
    stock: 10
});

manager.addProduct({
    title: "Audífonos",
    description: "Audífonos inalámbricos con cancelación de ruido",
    price: 200,
    thumbnail: "ruta/audifonos.png",
    code: "AUD789",
    stock: 15
});

// Obtener todos los productos
console.log(manager.getProducts());

// Obtener producto por ID
console.log(manager.getProductById(1)); // Debería devolver el producto con ID 1
console.log(manager.getProductById(99)); // Debería devolver "Not found"