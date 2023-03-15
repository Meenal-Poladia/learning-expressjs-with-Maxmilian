const fs = require("fs");
const path = require("path");

const pathLocation = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static deleteProduct(id, price) {
        let cart;
        fs.readFile(pathLocation, (error, fileContent) => {
            cart = JSON.parse(fileContent);
            if (error) return;
            let updatedCart = {...cart};
            const product = updatedCart.products.findIndex(product => product.id === id);
            if (!product) return;
            const productQuantity = product.quantity;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id)
            updatedCart.totalPrice = cart.totalPrice - product.price * productQuantity;
            fs.writeFile(pathLocation, JSON.stringify(updatedCart), error => {
                console.log(error);
            })
        })
    }

    static addProduct(id, productPrice){
    //Fetch previous Cart
        fs.readFile(pathLocation, (error, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0,
            }
            if(!error) cart =  JSON.parse(fileContent);
            //Analyse the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                console.log(`Updated product`, updatedProduct);
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {
                    id: id,
                    quantity: 1

                }
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + (+productPrice);
            fs.writeFile(pathLocation, JSON.stringify(cart), error => {
                console.log(error);
            })
        })
    }

    static getCart(callback) {
        fs.readFile(pathLocation, (error, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (error) callback(null);
            else callback(cart);
        })
    }
}