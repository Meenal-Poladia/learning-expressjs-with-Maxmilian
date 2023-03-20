const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/editing-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = Number(req.body.price);
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
        .then((result => {
            console.log(`Created the product`);
        }))
        .catch((error) => {
            console.log(error);
        })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    if (!editMode) res.redirect("/");
    Product.findById(productId, product => {
        if (!product) res.redirect("/");
        res.render('admin/editing-product', {
            pageTitle: 'Edit Product',
            path: '/admin/editing-product',
            editing: true,
            product: product
        });
    })
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect("/admin/products");
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect("/admin/products");
}