const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
    User.findByPk(1)
        .then(user => {
            request.user = user
            next()
        })
        .catch(error => console.log(error))
})

app.use("/admin", adminRoutes);
app.use(shopRoute);

// db.execute("SELECT * FROM products")
//     .then((result) => {
//         console.log(result[0], result[1]);})
//     .catch((error) => {
//         console.log(error);})

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
})

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: { model: CartItem, unique: false } });
Product.belongsToMany(User, {through: { model: CartItem, unique: false } });

//This is run when we use the command npm start to start the development server.
sequelize.sync({ force: true })
    .then((result) => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) return User.create({name: "Max", email: "test@gmail.com"})
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(() =>  app.listen(3000))
    .catch(error => console.log(error))

