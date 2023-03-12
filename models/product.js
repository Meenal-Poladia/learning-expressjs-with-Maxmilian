const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (callback) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) callback([])
        else callback(JSON.parse(fileContent));
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(`In writeFile`,err);
            });
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}
