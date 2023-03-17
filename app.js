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

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoute);

// db.execute("SELECT * FROM products")
//     .then((result) => {
//         console.log(result[0], result[1]);})
//     .catch((error) => {
//         console.log(error);})

app.use(errorController.get404);

sequelize.sync()
    .then((result) => {
        console.log(result);
        app.listen(3000);
    })
    .catch(error => console.log(error))

