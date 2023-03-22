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
    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
        .then((result => {
            res.redirect("/");
        }))
        .catch((error) => {
            console.log(error);
        })
}


exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    if (!editMode) res.redirect("/");

    req.user.getProducts({where: {id: productId}})
    Product.findByPk(productId)
        .then(products => {
            if (!products) res.redirect("/");
            res.render('admin/editing-product', {
                pageTitle: 'Edit Product',
                path: '/admin/editing-product',
                editing: true,
                product: products
            });
        })
        .catch(error => console.log(error));
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl
            return product.save();
        })
        .then(() => res.redirect("/admin/products"))
        .catch((error) => console.log(error));
}



exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect("/admin/products");
        })
        .catch(error => console.log(error));
}